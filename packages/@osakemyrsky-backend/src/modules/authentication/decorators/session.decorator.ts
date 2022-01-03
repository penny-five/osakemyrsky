import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlContextType, GqlExecutionContext } from "@nestjs/graphql";
import { Request } from "express";

import { SessionToken } from "../token.service";

export const Session = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  let token: SessionToken | undefined;

  switch (ctx.getType<GqlContextType>()) {
    case "graphql":
      token = GqlExecutionContext.create(ctx).getContext<{ req: Request }>().req.user as SessionToken;
      break;
    default:
      token = ctx.switchToHttp().getRequest<Request>().user as SessionToken;
      break;
  }

  return token;
});
