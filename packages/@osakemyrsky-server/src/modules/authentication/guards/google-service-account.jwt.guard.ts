import { Injectable, UnauthorizedException, Logger } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class GoogleServiceAccountAuthGuard extends AuthGuard("google-service-account-jwt") {
  private readonly logger = new Logger(GoogleServiceAccountAuthGuard.name);

  handleRequest<JwtPayload>(err: Error, payload: JwtPayload) {
    if (err) {
      this.logger.warn(err);
      throw new UnauthorizedException({ message: "Invalid authentication token" });
    }

    if (!payload) {
      throw new UnauthorizedException({ message: "Invalid authentication token" });
    }

    return payload;
  }
}
