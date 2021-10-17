import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlContextType, GqlExecutionContext } from "@nestjs/graphql";
import { Request } from "express";

import { AuthenticatedUser } from "../authentication.types";

export const Token = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  let user: AuthenticatedUser | undefined;

  switch (ctx.getType<GqlContextType>()) {
    case "graphql":
      user = GqlExecutionContext.create(ctx).getContext<{ req: Request }>().req.user as AuthenticatedUser;
      break;
    default:
      user = ctx.switchToHttp().getRequest<Request>().user as AuthenticatedUser;
      break;
  }

  return user?.token;
});
