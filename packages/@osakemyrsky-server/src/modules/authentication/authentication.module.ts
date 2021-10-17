import { forwardRef, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

import { JwtConfig } from "../config/jwt";
import { UserModule } from "../users/user.module";

import { AuthResolver } from "./authentication.resolver";
import { AuthenticationService } from "./authentication.service";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({
  imports: [
    ConfigModule,
    forwardRef(() => UserModule),
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
  providers: [AuthenticationService, AuthResolver, JwtStrategy]
})
export class AuthModule {}
