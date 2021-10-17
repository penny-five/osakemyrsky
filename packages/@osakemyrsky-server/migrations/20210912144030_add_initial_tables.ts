import * as Knex from "knex";

export const up = async (knex: Knex) => {
  await knex.schema.createTable("user", table => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.dateTime("created_at").defaultTo(knex.fn.now()).notNullable();
    table.dateTime("updated_at").defaultTo(knex.fn.now()).notNullable();
    table.text("email").unique().notNullable();
    table.string("name", 128).notNullable();
  });

  await knex.schema.createTable("league", table => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.dateTime("created_at").defaultTo(knex.fn.now()).notNullable();
    table.dateTime("updated_at").defaultTo(knex.fn.now()).notNullable();
    table.uuid("creator_id").notNullable().references("id").inTable("user").onDelete("cascade");
    table.date("start_date").notNullable();
    table.date("end_date").notNullable();
    table.string("name", 128).notNullable();
  });

  await knex.schema.createTable("member", table => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.dateTime("created_at").defaultTo(knex.fn.now()).notNullable();
    table.dateTime("updated_at").defaultTo(knex.fn.now()).notNullable();
    table.uuid("user_id").notNullable().references("id").inTable("user").onDelete("cascade");
    table.uuid("league_id").notNullable().references("id").inTable("league").onDelete("cascade");
    table.string("company_name", 128).notNullable();
    table.unique(["user_id", "league_id"]);
  });

  await knex.schema.createTable("deposit", table => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.dateTime("created_at").defaultTo(knex.fn.now()).notNullable();
    table.dateTime("updated_at").defaultTo(knex.fn.now()).notNullable();
    table.uuid("member_id").notNullable().references("id").inTable("member").onDelete("cascade");
    table.integer("sum_eur").notNullable();
  });

  await knex.raw("ALTER TABLE deposit ADD CONSTRAINT sum_eur CHECK (sum_eur >= 0)");

  await knex.schema.createTable("transaction", table => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.dateTime("created_at").defaultTo(knex.fn.now()).notNullable();
    table.dateTime("updated_at").defaultTo(knex.fn.now()).notNullable();
    table.uuid("member_id").notNullable().references("id").inTable("user").onDelete("cascade");
    table.text("stock_name").notNullable();
    table.integer("stock_price_eur").notNullable();
    table.integer("stock_share_change").unsigned().notNullable();
  });

  await knex.raw("ALTER TABLE transaction ADD CONSTRAINT stock_price_eur CHECK (stock_price_eur >= 0)");

  await knex.schema.createTable("order", table => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.dateTime("created_at").defaultTo(knex.fn.now()).notNullable();
    table.dateTime("updated_at").defaultTo(knex.fn.now()).notNullable();
    table.text("email").notNullable();
    table.text("name").notNullable();
  });
};

export const down = async (knex: Knex) => {
  await knex.schema.dropTable("order");
  await knex.schema.dropTable("transaction");
  await knex.schema.dropTable("deposit");
  await knex.schema.dropTable("member");
  await knex.schema.dropTable("league");
  await knex.schema.dropTable("user");
};
