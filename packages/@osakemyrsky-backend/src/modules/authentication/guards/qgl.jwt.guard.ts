import { ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";
import { Request, Response } from "express";

@Injectable()
export class GqlUserAuthGuard extends AuthGuard("session") {
  getRequest(context: ExecutionContext) {
    return GqlExecutionContext.create(context).getContext<{ req: Request }>().req;
  }

  getResponse(context: ExecutionContext) {
    return GqlExecutionContext.create(context).getContext<{ res: Response }>().res;
  }
}
