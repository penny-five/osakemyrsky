import { Model, ModelClass, Transaction } from "objection";

import { BaseModel } from "../../models/base/base.model";

export interface FindAllParams<T> {
  search?: string | null;
  limit?: number;
  offset?: number;
  orderBy?: T;
}

export abstract class CrudService<T extends Model, OrderByType> {
  constructor(protected readonly model: ModelClass<T>) {}

  protected static searchColumn: string | null = null;

  findById(id: string, trx?: Transaction) {
    return this.model.query(trx).findById(id);
  }

  findAll(params?: FindAllParams<OrderByType>, trx?: Transaction) {
    const query = this.model.query(trx);

    if (params?.search != null) {
      if (CrudService.searchColumn == "") {
        throw new Error("#getSearchColumn not set in CrudService subclass");
      }

      query.modify(BaseModel.WHERE_LIKE, this.getSearchColumnOrThrow(), params.search);
    }

    if (params?.limit != null) {
      query.limit(params.limit);
    }

    if (params?.offset != null) {
      query.offset(params.offset);
    }

    if (params?.orderBy != null) {
      query.orderBy(this.model.ref(params.orderBy as unknown as string));
    }

    return query;
  }

  async createOne(data: Partial<T>, trx?: Transaction) {
    await this.model.query(trx).insert(data);
  }

  createAndFetchOne(data: Partial<T>, trx?: Transaction) {
    return this.model.query(trx).insertAndFetch(data);
  }

  async updateOne(id: string, data: Partial<Omit<T, "id" | "created_at" | "updated_at">>, trx?: Transaction) {
    await this.model.query(trx).update(data).where("id", id);
  }

  updateAndFetchOne(id: string, data: Partial<Omit<T, "id" | "created_at" | "updated_at">>, trx?: Transaction) {
    return this.model.query(trx).updateAndFetchById(id, data);
  }

  async deleteOne(id: string, trx?: Transaction) {
    await this.model.query(trx).deleteById(id);
  }

  private getSearchColumnOrThrow() {
    const searchColumn = (this.constructor as typeof CrudService).searchColumn;

    if (searchColumn == null) {
      const subclassName = this.constructor.name;
      throw new Error(`static property "searchColumn" not set in CrudService subclass "${subclassName}"`);
    }

    return searchColumn;
  }
}
