#!/bin/bash

region="europe-west1"

enabled_apis=(
  "appengine.googleapis.com"
  "cloudresourcemanager.googleapis.com"
  "cloudscheduler.googleapis.com"
  "iam.googleapis.com"
  "run.googleapis.com"
  "secretmanager.googleapis.com"
)

terraform_roles=(
  "roles/appengine.appCreator"
  "roles/appengine.appViewer"
  "roles/cloudscheduler.admin"
  "roles/iam.serviceAccountAdmin"
  "roles/iam.serviceAccountUser"
  "roles/resourcemanager.projectIamAdmin"
  "roles/run.admin"
  "roles/secretmanager.admin"
)

if [ -z "${GCP_ENV_PROJECT_ID}" ]; then
  echo "Error: GCP_ENV_PROJECT_ID env variable not set."
  exit 1
fi

if [ -z "${GCP_OPS_PROJECT_ID}" ]; then
  echo "Error: GCP_OPS_PROJECT_ID env variable not set."
  exit 1
fi

# Enable all required APIs in the project
gcloud services enable --project="${GCP_ENV_PROJECT_ID}" "${enabled_apis[@]}"

# Check if the state bucket already exists
gsutil -q ls gs://osakemyrsky-dev-tfstate >/dev/null 2>&1

if [ $? -eq 0 ]; then
  echo "State bucket already exists."
else
  gsutil mb -b on -l "${region}" -p "${GCP_OPS_PROJECT_ID}" gs://$GCP_ENV_PROJECT_ID-tfstate
  echo "State bucket created."
fi

# Check if Terraform service account already exists
gcloud iam service-accounts describe terraform@$GCP_ENV_PROJECT_ID.iam.gserviceaccount.com --project="${GCP_ENV_PROJECT_ID}" >/dev/null 2>&1

if [ $? -eq 0 ]; then
  echo "Terraform service account already exists."
else
  # Create Terraform service account
  gcloud iam service-accounts create terraform \
    --project="${GCP_ENV_PROJECT_ID}" \
    --display-name="Terraform service account"

  # Grant admin access to Terraform state bucket
  gsutil iam ch serviceAccount:terraform@$GCP_ENV_PROJECT_ID.iam.gserviceaccount.com:admin gs://$GCP_ENV_PROJECT_ID-tfstate

  echo "Terraform service account created."
fi

# Grant all required roles for the Terraform service account
for role in "${terraform_roles[@]}"; do
  gcloud projects add-iam-policy-binding $GCP_ENV_PROJECT_ID \
    --member serviceAccount:terraform@$GCP_ENV_PROJECT_ID.iam.gserviceaccount.com \
    --role "$role"
done

# Get env project id
env_project_id=$(gcloud projects list --filter="PROJECT_ID=${GCP_ENV_PROJECT_ID}" --format="value(PROJECT_NUMBER)")

# Grant Cloud Run service agent read access to Docker image repository on ops project
gcloud artifacts repositories add-iam-policy-binding osakemyrsky \
  --project="${GCP_OPS_PROJECT_ID}" \
  --location="${region}" \
  --member=serviceAccount:service-${env_project_id}@serverless-robot-prod.iam.gserviceaccount.com \
  --role=roles/artifactregistry.reader

echo "Done."
