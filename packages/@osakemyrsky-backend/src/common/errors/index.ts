import { ConflictException, NotFoundException, UnauthorizedException, BadRequestException } from "@nestjs/common";

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

export class LeagueInactiveError extends ConflictException {
  constructor() {
    super("League has not started yet or has already ended");
  }
}

export class UnsupportedStockError extends BadRequestException {
  constructor(symbol: string) {
    super(`Unsupported stock: "${symbol}"`);
  }
}
