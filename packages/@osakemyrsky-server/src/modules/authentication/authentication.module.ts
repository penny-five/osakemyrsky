import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

import { JwtConfig } from "../config/jwt";
import { UserModule } from "../users/user.module";

import { AuthResolver } from "./authentication.resolver";
import { AuthenticationService } from "./authentication.service";
import { GoogleServiceAccountStrategy } from "./strategies/google-service-account.strategy";
import { UserJwtStrategy } from "./strategies/jwt.strategy";

@Module({
  imports: [
    ConfigModule,
    UserModule,
    JwtModule.registerAsync({
      useFactory(configService: ConfigService) {
        const config = configService.get<JwtConfig>("jwt")!;

        return {
          privateKey: config.key.private.pem,
          signOptions: {
            issuer: config.issuer,
            algorithm: config.key.algorithm,
            expiresIn: "1h"
          }
        };
      },
      inject: [ConfigService],
      imports: [ConfigModule]
    })
  ],
  providers: [AuthenticationService, AuthResolver, UserJwtStrategy, GoogleServiceAccountStrategy]
})
export class AuthModule {}
