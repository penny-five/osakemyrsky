import "next-auth";

export module "next-auth" {
  export interface Session {
    serverToken: string;
  }
}
