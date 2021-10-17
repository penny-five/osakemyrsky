import { registerAs } from "@nestjs/config";
import { Algorithm } from "jsonwebtoken";
import jwkToPem, { JWK } from "jwk-to-pem";

import { parseJSON } from "../../utils/json";

export interface JwtConfig {
  issuer: string;
  key: {
    algorithm: Algorithm;
    public: {
      pem: string;
    };
    private: {
      jwk: JWK;
      pem: string;
    };
  };
}

export const jwtConfig = registerAs<JwtConfig>("jwt", () => {
  const privateKeyJWK = parseJSON<JWK & { alg?: Algorithm }>(process.env.JWT_SIGNING_KEY);

  if (privateKeyJWK.alg == null) {
    throw new Error("Missing signing key algorithm");
  }

  const config: JwtConfig = {
    issuer: "osakemyrsky",
    key: {
      algorithm: privateKeyJWK.alg,
      private: {
        jwk: privateKeyJWK,
        pem: jwkToPem(privateKeyJWK, { private: true })
      },
      public: {
        pem: jwkToPem(privateKeyJWK, { private: false })
      }
    }
  };

  return config;
});
