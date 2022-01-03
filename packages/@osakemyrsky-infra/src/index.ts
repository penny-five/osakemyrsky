import { App, TerraformStack, TerraformOutput, GcsBackend } from "cdktf";
import { Construct } from "constructs";

import {
  GoogleProvider,
  AppEngineApplication,
  CloudRunService,
  CloudRunServiceIamPolicy,
  CloudSchedulerJob,
  DataGoogleIamPolicy,
  CloudRunDomainMapping
} from "../.gen/providers/google";
import { RandomProvider, Password } from "../.gen/providers/random";

import { Secret } from "./constructs/secret";
import { ServiceAccount } from "./constructs/service-account";

class OsakemyrskyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const project = this.node.tryGetContext("project") as string;
    const region = this.node.tryGetContext("region") as string;
    const domain = this.node.tryGetContext("domain") as string;

    new GcsBackend(this, {
      bucket: this.node.tryGetContext("stateBucketName") as string
    });

    new GoogleProvider(this, "google", {
      project,
      region
    });

    new RandomProvider(this, "random");

    new AppEngineApplication(this, "App", {
      locationId: "europe-west",
      databaseType: "CLOUD_FIRESTORE"
    });

    const backendServiceAccount = new ServiceAccount(this, "BackendServiceAccount", {
      project,
      accountId: "osakemyrsky-backend",
      displayName: "Osakemyrsky backend service account",
      roles: ["roles/datastore.user"]
    });

    /**
     * Google client id is left empty and has to be populated manually.
     */
    const authGoogleClientIdSecret = new Secret(this, "AuthGoogleClientIdSecret", {
      id: "auth-google-client-id",
      accessors: [`serviceAccount:${backendServiceAccount.email}`]
    });

    /**
     * Google client secret is left empty and has to be populated manually.
     */
    const authGoogleClientSecretSecret = new Secret(this, "AuthGoogleClientSecretSecret", {
      id: "auth-google-client-secret",
      accessors: [`serviceAccount:${backendServiceAccount.email}`]
    });

    const authGoogleClientRedirectUrlSecret = new Secret(this, "AuthGoogleClientRedirectUrlSecret", {
      id: "auth-google-client-redirect-url",
      secretData: `https://${domain}/auth/redirect/google`,
      accessors: [`serviceAccount:${backendServiceAccount.email}`]
    });

    const ironPassword = new Password(this, "IronPassword", {
      length: 64
    });

    const ironPasswordSecret = new Secret(this, "IronPasswordSecret", {
      id: "backend-iron-password",
      secretData: ironPassword.result,
      accessors: [`serviceAccount:${backendServiceAccount.email}`]
    });

    const backendService = new CloudRunService(this, "BackendService", {
      name: "osakemyrsky-backend",
      location: region,
      template: {
        spec: {
          serviceAccountName: backendServiceAccount.email,
          containers: [
            {
              image: this.buildImageUrl("osakemyrsky-backend"),
              ports: [{ containerPort: 8080 }],
              env: [
                {
                  name: "NODE_ENV",
                  value: "production"
                },
                {
                  name: "IRON_PASSWORD",
                  valueFrom: {
                    secretKeyRef: {
                      name: ironPasswordSecret.secretId,
                      key: "latest"
                    }
                  }
                },
                {
                  name: "AUTH_GOOGLE_CLIENT_ID",
                  valueFrom: {
                    secretKeyRef: {
                      name: authGoogleClientIdSecret.secretId,
                      key: "latest"
                    }
                  }
                },
                {
                  name: "AUTH_GOOGLE_CLIENT_SECRET",
                  valueFrom: {
                    secretKeyRef: {
                      name: authGoogleClientSecretSecret.secretId,
                      key: "latest"
                    }
                  }
                },
                {
                  name: "AUTH_GOOGLE_CLIENT_REDIRECT_URL",
                  valueFrom: {
                    secretKeyRef: {
                      name: authGoogleClientRedirectUrlSecret.secretId,
                      key: "latest"
                    }
                  }
                }
              ]
            }
          ]
        }
      }
    });

    const frontendServiceAccount = new ServiceAccount(this, "FrontendServiceAccount", {
      project,
      accountId: "osakemyrsky-frontend",
      displayName: "Osakemyrsky frontend service account"
    });

    const frontendService = new CloudRunService(this, "FrontendService", {
      name: "osakemyrsky-frontend",
      location: region,
      template: {
        spec: {
          serviceAccountName: frontendServiceAccount.email,
          containers: [
            {
              image: this.buildImageUrl("osakemyrsky-frontend"),
              ports: [{ containerPort: 8080 }],
              env: [
                {
                  name: "NODE_ENV",
                  value: "production"
                },
                {
                  name: "API_URL",
                  value: backendService.status("0").url
                }
              ]
            }
          ]
        }
      }
    });

    const taskSchedulerServiceAccount = new ServiceAccount(this, "TaskSchedulerServiceAccount", {
      project,
      accountId: "osakemyrsky-task-scheduler",
      displayName: "Osakemyrsky task scheduler service account"
    });

    new CloudSchedulerJob(this, "TriggerProcessOrdersTaskJob", {
      name: "trigger-process-orders-task",
      description: "Once per hour triggers order processing task on backend",
      schedule: "0 * * * *",
      httpTarget: {
        uri: `${backendService.status("0").url}/tasks/process-orders`,
        oidcToken: {
          audience: backendService.status("0").url,
          serviceAccountEmail: taskSchedulerServiceAccount.email
        }
      }
    });

    new CloudSchedulerJob(this, "TriggerUpdateBalancesTaskJob", {
      name: "trigger-update-balances-task",
      description: "Once per hour triggers balance update task on backend",
      schedule: "30 * * * *", // Use different schedule than for order processing to avoid collisions
      httpTarget: {
        uri: `${backendService.status("0").url}/tasks/update-balances`,
        oidcToken: {
          audience: backendService.status("0").url,
          serviceAccountEmail: taskSchedulerServiceAccount.email
        }
      }
    });

    const backendServiceIAMPolicyData = new DataGoogleIamPolicy(this, "BackendServiceIAMPolicyData", {
      binding: [
        {
          role: "roles/run.invoker",
          members: [
            `serviceAccount:${frontendServiceAccount.email}`,
            `serviceAccount:${taskSchedulerServiceAccount.email}`
          ]
        }
      ]
    });

    new CloudRunServiceIamPolicy(this, "BackendServiceIAMPolicy", {
      location: region,
      service: backendService.name,
      policyData: backendServiceIAMPolicyData.policyData
    });

    const frontendServiceIAMPolicyData = new DataGoogleIamPolicy(this, "FrontendServiceIAMPolicyData", {
      binding: [
        {
          role: "roles/run.invoker",
          members: ["allUsers"]
        }
      ]
    });

    new CloudRunServiceIamPolicy(this, "FrontendServiceIAMPolicy", {
      location: region,
      service: frontendService.name,
      policyData: frontendServiceIAMPolicyData.policyData
    });

    const frontendDomainMapping = new CloudRunDomainMapping(this, "FrontendDomainMapping", {
      name: domain,
      location: region,
      metadata: {
        namespace: project
      },
      spec: {
        routeName: frontendService.name
      }
    });

    new TerraformOutput(this, "DomainMappingUrl", {
      staticId: true,
      value: `https://${frontendDomainMapping.name}`
    });

    new TerraformOutput(this, "FrontendServiceUrl", {
      staticId: true,
      value: frontendService.status("0").url
    });

    new TerraformOutput(this, "BackendServiceUrl", {
      staticId: true,
      value: backendService.status("0").url
    });
  }

  private buildImageUrl(name: string) {
    const repositoryBaseUrl = this.node.tryGetContext("dockerRepositoryBaseUrl") as string;
    const tag = this.node.tryGetContext("dockerImageTag") as string;
    return `${repositoryBaseUrl}/${name}:${tag}`;
  }
}

const app = new App({
  context: {
    project: process.env.GCP_PROJECT_ID,
    stateBucketName: process.env.TF_STATE_BUCKET_NAME,
    dockerRepositoryBaseUrl: process.env.DOCKER_REPOSITORY_BASE_URL,
    dockerImageTag: process.env.DOCKER_IMAGE_TAG,
    domain: process.env.DOMAIN,
    region: "europe-west1"
  }
});

new OsakemyrskyStack(app, "osakemyrsky");

app.synth();
