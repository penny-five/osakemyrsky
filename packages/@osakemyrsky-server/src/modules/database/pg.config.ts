import { types } from "pg";

// Do not convert timestamps into Dates
types.setTypeParser(types.builtins.TIMESTAMP, value => value);
types.setTypeParser(types.builtins.TIMESTAMPTZ, value => value);
