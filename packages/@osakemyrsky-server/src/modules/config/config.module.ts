import { Module } from "@nestjs/common";
import { ConfigModule as NestjsConfigModule } from "@nestjs/config";

import { firestoreConfig } from "./firestore";
import { gameConfig } from "./game";
import { jwtConfig } from "./jwt";
import { serviceAccountAuthConfig } from "./service-account-auth";

@Module({
  imports: [
    NestjsConfigModule.forRoot({
      ignoreEnvFile: true,
      load: [gameConfig, firestoreConfig, jwtConfig, serviceAccountAuthConfig]
    })
  ]
})
export class ConfigModule {}
