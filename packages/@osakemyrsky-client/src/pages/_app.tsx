import { ApolloProvider } from "@apollo/client";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import Head from "next/head";
import { FunctionComponent } from "react";

import "@/styles/globals.css";
import { client } from "src/apollo/client";
import DefaultLayout from "src/layouts/default";
import LeagueSelectionRedirect from "src/layouts/league-redirect";
import { DefaultLeagueProvider } from "src/providers/default-league";
import { UserProvider } from "src/providers/user";

const OsakemyrskyApp: FunctionComponent<AppProps> = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <ApolloProvider client={client}>
      <Head>
        <title>Osakemyrsky</title>
        <meta name="description" content="osakemyrsky" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionProvider session={session}>
        <UserProvider>
          <DefaultLeagueProvider>
            <LeagueSelectionRedirect>
              <DefaultLayout>
                <Component {...pageProps} />
              </DefaultLayout>
            </LeagueSelectionRedirect>
          </DefaultLeagueProvider>
        </UserProvider>
      </SessionProvider>
    </ApolloProvider>
  );
};

export default OsakemyrskyApp;
