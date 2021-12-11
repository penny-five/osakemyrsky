import { ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";
import { Request, Response } from "express";

@Injectable()
export class GqlJwtAuthGuard extends AuthGuard("user-jwt") {
  getRequest(context: ExecutionContext) {
    return GqlExecutionContext.create(context).getContext<{ req: Request }>().req;
  }

  getResponse(context: ExecutionContext) {
    return GqlExecutionContext.create(context).getContext<{ res: Response }>().res;
  }
}
