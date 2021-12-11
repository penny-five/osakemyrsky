import { setContext } from "@apollo/client/link/context";
import { Session } from "next-auth";

export const authLink = setContext((_request, prevContext: { session: Session | undefined | null }) => {
  if (prevContext.session?.serverToken != null) {
    return {
      ...prevContext,
      headers: {
        authorization: `Bearer ${prevContext.session.serverToken}`
      }
    };
  }

  return prevContext;
});
