export enum IssuerID {
  GOOGLE = "google"
}

export interface UserInfo {
  sub: string;
  name: string;
  email: string;
  picture: string | null;
}

export interface Issuer {
  validateToken(token: string): Promise<UserInfo | false>;
}
