import { GoogleAuth, IdTokenClient } from "google-auth-library";
import type { NextApiRequest, NextApiResponse } from "next";
import httpProxyMiddleware from "next-http-proxy-middleware";

const auth = new GoogleAuth();

let tokenClient: IdTokenClient | null = null;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (tokenClient == null) {
    tokenClient = await auth.getIdTokenClient(process.env.API_URL);
  }

  const headers = await tokenClient.getRequestHeaders();

  return httpProxyMiddleware(req, res, {
    target: process.env.API_URL,
    pathRewrite: [
      {
        patternStr: "^/api",
        replaceStr: ""
      }
    ],
    headers
  });
};

export default handler;
