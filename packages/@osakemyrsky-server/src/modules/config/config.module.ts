import { Module } from "@nestjs/common";
import { ConfigModule as NestjsConfigModule } from "@nestjs/config";

import { firestoreConfig } from "./files/firestore";
import { gameConfig } from "./files/game";
import { googleIdentityProviderConfig } from "./files/google-idp";
import { ironConfig } from "./files/iron";
import { serviceAccountAuthConfig } from "./files/service-account-auth";

@Module({
  imports: [
    NestjsConfigModule.forRoot({
      ignoreEnvFile: true,
      load: [gameConfig, firestoreConfig, serviceAccountAuthConfig, googleIdentityProviderConfig, ironConfig]
    })
  ]
})
export class ConfigModule {}
