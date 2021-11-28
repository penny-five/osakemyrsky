import { Firestore } from "@google-cloud/firestore";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { FirestoreConfig } from "../config/firestore";

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: Firestore,
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return new Firestore({
          ssl: configService.get<FirestoreConfig>("firestore")?.ssl,
          host: configService.get<FirestoreConfig>("firestore")?.hostUrl,
          port: configService.get<FirestoreConfig>("firestore")?.hostPort
        });
      }
    }
  ],
  exports: [Firestore]
})
export class FirestoreModule {}
