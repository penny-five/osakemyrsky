import { Inject, Injectable } from "@nestjs/common";
import { Transaction } from "objection";

import { CrudService } from "../database/common/service/crud.service";
import { User } from "../database/models/user.model";

export enum UsersOrderBy {
  NAME = "name"
}

@Injectable()
export class UserService extends CrudService<User, UsersOrderBy> {
  static searchColumn = "name";

  constructor(@Inject(User) userModel: typeof User) {
    super(userModel);
  }

  findByEmail(email: string, trx?: Transaction) {
    return this.model.query(trx).findOne({ email });
  }

  findBySub(sub: string, trx?: Transaction) {
    return this.model.query(trx).findOne({ sub });
  }
}
