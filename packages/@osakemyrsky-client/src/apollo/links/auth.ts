import { setContext } from "@apollo/client/link/context";
import { Session } from "next-auth";

export const authLink = setContext(async (_request, prevContext) => {
  const session: Session | undefined | null = prevContext.session;

  if (session?.serverToken != null) {
    return {
      ...prevContext,
      headers: {
        authorization: `Bearer ${session.serverToken}`
      }
    };
  }

  return prevContext;
});
