import { NotFoundException, UnauthorizedException } from "@nestjs/common";

import { capitalize } from "../../utils/strings";

export class AuthorizationError extends UnauthorizedException {
  constructor(message = "Authorization error") {
    super(message);
  }
}

export class DocumentNotFoundError extends NotFoundException {
  constructor(type: string, id?: string | number) {
    super(id != null ? `${capitalize(type)} with id ${id} not found` : `${capitalize(type)} not found`);
  }
}
