import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { GoogleIdentityProviderConfig } from "../config/files/google-idp";
import { UserModule } from "../users/user.module";

import { AuthenticationController } from "./authentication.controller";
import { AuthenticationService } from "./authentication.service";
import { IdentityProvider } from "./idp";
import { GoogleServiceAccountStrategy } from "./strategies/google-service-account.strategy";
import { SessionStrategy } from "./strategies/session.strategy";
import { TokenService } from "./token.service";

@Module({
  imports: [ConfigModule, UserModule],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    TokenService,
    SessionStrategy,
    GoogleServiceAccountStrategy,
    {
      provide: "google-idp",
      useFactory(configService: ConfigService) {
        const config = configService.get<GoogleIdentityProviderConfig>("google-idp")!;

        return IdentityProvider.create({
          id: "google",
          discoveryUrl: "https://accounts.google.com/.well-known/openid-configuration",
          clientId: config.clientId,
          clientSecret: config.clientSecret,
          redirectUrl: config.redirectUrl
        });
      },
      inject: [ConfigService]
    }
  ]
})
export class AuthModule {}
