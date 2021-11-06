import { NotFoundException, UnauthorizedException } from "@nestjs/common";

import { capitalize } from "../../utils/strings";

export class AuthorizationError extends UnauthorizedException {
  constructor(message = "Authorization error") {
    super(message);
  }
}

export class EntityNotFoundError extends NotFoundException {
  constructor(type: string, id: string | number) {
    super(`${capitalize(type)} with id ${id} not found`);
  }
}
