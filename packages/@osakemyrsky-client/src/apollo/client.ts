import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";

import { authLink } from "./links/auth";

import { isBrowser } from "src/utils/nextjs";

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([
    authLink,
    new HttpLink({
      uri: () => {
        let baseUrl: string;

        if (isBrowser()) {
          baseUrl = process.env.NEXT_PUBLIC_APOLLO_URL;
        } else {
          baseUrl = process.env.NEXT_PUBLIC_APOLLO_URL_INTERNAL || process.env.NEXT_PUBLIC_APOLLO_URL;
        }

        return `${baseUrl}/graphql`;
      }
    })
  ])
});
