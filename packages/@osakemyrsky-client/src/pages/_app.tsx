import { ApolloProvider } from "@apollo/client";
import { AppProps } from "next/app";
import Head from "next/head";

import "@/styles/globals.css";

import { client } from "@/apollo/client";
import AuthRedirect from "@/layouts/auth-redirect";
import DefaultLayout from "@/layouts/default";
import { ActiveLeagueProvider } from "@/providers/active-league";
import { ActiveMembershipProvider } from "@/providers/active-membership";
import { SessionProvider } from "@/providers/session";
import { UserProvider } from "@/providers/user";

const OsakemyrskyApp = ({ Component, pageProps: { ...pageProps } }: AppProps) => {
  return (
    <ApolloProvider client={client}>
      <Head>
        <title>Osakemyrsky</title>
        <meta name="description" content="osakemyrsky" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionProvider>
        <UserProvider>
          <ActiveLeagueProvider>
            <AuthRedirect>
              <ActiveMembershipProvider>
                <DefaultLayout>
                  <Component {...pageProps} />
                </DefaultLayout>
              </ActiveMembershipProvider>
            </AuthRedirect>
          </ActiveLeagueProvider>
        </UserProvider>
      </SessionProvider>
    </ApolloProvider>
  );
};

export default OsakemyrskyApp;
