import { types } from "pg";

// Use `Date#toISOString` to make timestamps adhere to ISO-8601-1:2019 standard
types.setTypeParser(types.builtins.TIMESTAMP, value => new Date(value).toISOString());
types.setTypeParser(types.builtins.TIMESTAMPTZ, value => new Date(value).toISOString());
