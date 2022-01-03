import { Construct } from "constructs";

import { ServiceAccount as GoogleServiceAccount, ProjectIamMember } from "../../.gen/providers/google";

export interface ServiceAccountConfig {
  project: string;
  accountId: string;
  displayName: string;
  roles?: string[];
}

export class ServiceAccount extends Construct {
  private readonly serviceAccount: GoogleServiceAccount;

  constructor(scope: Construct, id: string, config: ServiceAccountConfig) {
    super(scope, id);

    this.serviceAccount = new GoogleServiceAccount(this, "ServiceAccount", {
      accountId: config.accountId,
      displayName: config.displayName
    });

    if (config.roles != null) {
      for (const role of config.roles) {
        new ProjectIamMember(this, `IamMember-${role}`, {
          project: config.project,
          member: `serviceAccount:${this.serviceAccount.email}`,
          role
        });
      }
    }
  }

  get accountId() {
    return this.serviceAccount.accountId;
  }

  get displayName() {
    return this.serviceAccount.displayName;
  }

  get email() {
    return this.serviceAccount.email;
  }
}
