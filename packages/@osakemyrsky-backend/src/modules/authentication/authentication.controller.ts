import { Controller, Get, Query, Res, BadRequestException, Param, Req } from "@nestjs/common";
import { addHours } from "date-fns";
import { Request, Response } from "express";

import { AuthenticationService } from "./authentication.service";

@Controller({ path: "/auth" })
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Get("/login")
  login(@Query("idp") idp: string, @Res({ passthrough: true }) res: Response) {
    if (!this.authService.isSupportedIdentityProvider(idp)) {
      throw new BadRequestException(`Unsupported idp: ${idp}`);
    }

    const url = this.authService.createAuthorizationUrl(idp);

    res.redirect(url);
  }

  @Get("/logout")
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie("session");
    res.redirect("/");
  }

  @Get("/redirect/:idp")
  async handleRedirect(@Param("idp") idp: string, @Req() req: Request, @Res({ passthrough: true }) res: Response) {
    if (!this.authService.isSupportedIdentityProvider(idp)) {
      throw new BadRequestException(`Unsupported idp: ${idp}`);
    }

    const token = await this.authService.handleRedirect(idp, req);

    res.cookie("session", token, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: addHours(new Date(), 24)
    });

    res.redirect("/");
  }
}
