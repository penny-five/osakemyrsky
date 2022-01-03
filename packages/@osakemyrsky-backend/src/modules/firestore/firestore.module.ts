import { Firestore, Settings as FirestoreSettings } from "@google-cloud/firestore";
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

        const settings: FirestoreSettings = {
          ssl: config.ssl,
          host: config.hostUrl,
          port: config.hostPort
        };

        for (const key in settings) {
          if (settings[key] == null) {
            delete settings[key]; // delete undefined values to make Firestore SDK happy
          }
        }

        return new Firestore(settings);
      }
    }
  ],
  exports: [Firestore]
})
export class FirestoreModule {}
