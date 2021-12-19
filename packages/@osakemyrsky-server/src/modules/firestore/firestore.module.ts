import { Firestore } from "@google-cloud/firestore";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService, ConfigType } from "@nestjs/config";

import { FirestoreConfig } from "../config/files/firestore";

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: Firestore,
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        const config = configService.get<ConfigType<typeof FirestoreConfig>>("firestore")!;

        return new Firestore({
          ssl: config.ssl,
          host: config.hostUrl,
          port: config.hostPort
        });
      }
    }
  ],
  exports: [Firestore]
})
export class FirestoreModule {}
