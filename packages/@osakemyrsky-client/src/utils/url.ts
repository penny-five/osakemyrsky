import isEqual from "lodash.isequal";

export type Urllike =
  | string
  | {
      pathname?: string | null;
      asPath?: string;
      query?: unknown;
    };

/**
 * Relatively naive function for comparing two urllike objects or strings.
 *
 * @param first First urllike object or string
 * @param second Second urllike object or string
 * @returns `true` if the two objects or string match
 */
export const urlMatches = (first: Urllike, second: Urllike) => {
  if (typeof first === "string" && typeof second === "string") {
    return first === second;
  }

  if (typeof first === "string" && typeof second === "object") {
    return first === second.asPath || first === second.pathname;
  }

  if (typeof first === "object" && typeof second === "string") {
    return first.asPath === second || first.pathname === second;
  }

  if (typeof first === "object" && typeof second === "object") {
    return first.pathname === second.pathname || (first.asPath === second.asPath && isEqual(first.query, second.query));
  }
};
