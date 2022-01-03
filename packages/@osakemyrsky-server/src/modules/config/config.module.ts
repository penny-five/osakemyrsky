import { Module } from "@nestjs/common";
import { ConfigModule as NestjsConfigModule } from "@nestjs/config";

import { FirestoreConfig } from "./files/firestore";
import { GameConfig } from "./files/game";
import { GoogleIdentityProviderConfig } from "./files/google-idp";
import { IronConfig } from "./files/iron";

@Module({
  imports: [
    NestjsConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [GameConfig, FirestoreConfig, GoogleIdentityProviderConfig, IronConfig]
    })
  ]
})
export class ConfigModule {}
