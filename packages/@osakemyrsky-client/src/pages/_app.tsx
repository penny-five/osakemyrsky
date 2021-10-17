import { ApolloProvider } from "@apollo/client";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import Head from "next/head";
import { FunctionComponent } from "react";

import "@/styles/globals.css";
import { client } from "src/apollo/client";
import Navbar from "src/components/navbar";

const OsakemyrskyApp: FunctionComponent<AppProps> = ({ Component, pageProps: { session, ...pageProps } }) => (
  <ApolloProvider client={client}>
    <Head>
      <title>osakemyrsky</title>
      <meta name="description" content="osakemyrsky" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <SessionProvider session={session}>
      <div className="flex flex-col items-center">
        <Navbar />
        <div className="p-8 w-full max-w-7xl">
          <Component {...pageProps} />
        </div>
      </div>
    </SessionProvider>
  </ApolloProvider>
);

export default OsakemyrskyApp;
