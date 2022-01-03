import { Construct } from "constructs";

import {
  SecretManagerSecret,
  SecretManagerSecretIamBinding,
  SecretManagerSecretVersion
} from "../../.gen/providers/google";

export interface SecretConfig {
  id: string;
  secretData?: string;
  accessors?: string[];
}

export class Secret extends Construct {
  private readonly secret: SecretManagerSecret;

  private readonly version?: SecretManagerSecretVersion;

  constructor(scope: Construct, id: string, config: SecretConfig) {
    super(scope, id);

    this.secret = new SecretManagerSecret(this, "Secret", {
      secretId: config.id,
      replication: {
        automatic: true
      }
    });

    if (config.secretData != null) {
      this.version = new SecretManagerSecretVersion(this, "SecretVersion", {
        secret: this.secret.name,
        secretData: config.secretData
      });
    }

    if (config.accessors != null) {
      new SecretManagerSecretIamBinding(this, "IronPasswordBackendServiceAccountBinding", {
        secretId: this.secret.secretId,
        members: config.accessors,
        role: "roles/secretmanager.secretAccessor"
      });
    }
  }

  get name() {
    return this.secret.name;
  }

  get secretId() {
    return this.secret.secretId;
  }
}
