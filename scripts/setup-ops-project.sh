#!/bin/bash

region="europe-west1"

enabled_apis=(
  "artifactregistry.googleapis.com"
  "cloudbuild.googleapis.com"
)

builder_roles=(
  "roles/cloudbuild.builds.editor"
  "roles/serviceusage.serviceUsageConsumer"
)

if [ -z "${GCP_OPS_PROJECT_ID}" ]; then
  echo "Error: GCP_OPS_PROJECT_ID env variable not set."
  exit 1
fi

# Enable all required APIs in project
gcloud services enable --project=${GCP_OPS_PROJECT_ID} "${enabled_apis[@]}"

# Check if Artifact Registry docker repository exists
gcloud artifacts repositories describe --project="${GCP_OPS_PROJECT_ID}" --location="${region}" osakemyrsky >/dev/null 2>&1

if [ $? -eq 0 ]; then
  echo "Artifact Registry docker repository already exists."
else
  # Create Artifact Registry docker repository
  gcloud artifacts repositories create osakemyrsky \
    --project="${GCP_OPS_PROJECT_ID}" \
    --repository-format=docker \
    --location="${region}" \
    --description="Osakemyrsky Docker repository"
  echo "Artifact Registry docker repository created."
fi

# Check if image-builder service account already exists
gcloud iam service-accounts describe image-builder@$GCP_OPS_PROJECT_ID.iam.gserviceaccount.com \
  --project="${GCP_OPS_PROJECT_ID}" \
  >/dev/null 2>&1

if [ $? -eq 0 ]; then
  echo "image-builder service account already exists."
else
  # Create image-builder service account
  gcloud iam service-accounts create image-builder \
    --project="${GCP_OPS_PROJECT_ID}" \
    --display-name="Image builder service account"
  echo "image-builder service account created."
fi

# Grant all required roles for the image-builder service account
for role in "${builder_roles[@]}"; do
  gcloud projects add-iam-policy-binding $GCP_OPS_PROJECT_ID \
    --member serviceAccount:image-builder@$GCP_OPS_PROJECT_ID.iam.gserviceaccount.com \
    --role "$role"
done

echo "Done."
