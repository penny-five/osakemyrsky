export interface AuthenticationToken {
  iat: number;
  exp: number;
  iss: string;
  sub: string;
}

export interface AuthenticatedUser {
  token: AuthenticationToken;
}
