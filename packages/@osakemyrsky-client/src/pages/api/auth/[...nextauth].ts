import { gql } from "@apollo/client";
import jwtDecode from "jwt-decode";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { client } from "@/apollo/client";
import { ServerJwtToken } from "@/types/auth";

interface SignInInput {
  data: {
    issuerID: string;
    token: string;
  };
}

interface SignInResult {
  signIn: {
    token: string;
  };
}

const SIGN_IN = gql`
  mutation SignIn($data: SignInInput!) {
    signIn(data: $data) {
      token
    }
  }
`;

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_SECRET
    })
  ],
  session: {
    maxAge: 60 * 60
  },
  callbacks: {
    session({ token }) {
      const serverToken = token.serverToken as string;
      const decodedServerToken = jwtDecode<ServerJwtToken>(serverToken);

      return {
        expires: new Date(decodedServerToken.exp * 1000).toISOString(),
        decodedServerToken,
        serverToken
      };
    },
    async jwt(params) {
      if (params.account) {
        const result = await client.mutate<SignInResult, SignInInput>({
          mutation: SIGN_IN,
          variables: {
            data: {
              issuerID: "GOOGLE",
              token: params.account.id_token!
            }
          }
        });

        return { ...params.token, serverToken: result.data!.signIn.token };
      }
      return params.token;
    }
  }
});
