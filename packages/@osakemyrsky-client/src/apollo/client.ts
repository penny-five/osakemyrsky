import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";

import { isBrowser } from "src/utils/nextjs";

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([
    new HttpLink({
      uri: () => {
        return isBrowser() ? `/api/graphql` : `${process.env.API_URL}/graphql`;
      }
    })
  ])
});
