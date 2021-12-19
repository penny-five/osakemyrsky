import { Module } from "@nestjs/common";
import { ConfigModule as NestjsConfigModule } from "@nestjs/config";

import { FirestoreConfig } from "./files/firestore";
import { GameConfig } from "./files/game";
import { GoogleIdentityProviderConfig } from "./files/google-idp";
import { IronConfig } from "./files/iron";
import { ServiceAccountAuthConfig } from "./files/service-account-auth";

@Module({
  imports: [
    NestjsConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [GameConfig, FirestoreConfig, ServiceAccountAuthConfig, GoogleIdentityProviderConfig, IronConfig]
    })
  ]
})
export class ConfigModule {}
