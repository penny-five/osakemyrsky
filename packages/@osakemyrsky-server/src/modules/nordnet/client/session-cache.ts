import got from "got";
import { CookieJar, Cookie } from "tough-cookie";

export class NordnetSessionCache {
  private httpClient: typeof got;

  private getSessionCookieTask: Promise<Cookie> | null = null;

  private sessionCookie: Cookie | null = null;

  constructor() {
    this.httpClient = got.extend({
      prefixUrl: "https://www.nordnet.fi/api/2",
      headers: {
        accept: "*/*",
        "client-id": "NEXT"
      },
      retry: 5
    });
  }

  private isExpired() {
    return this.sessionCookie != null && new Date() > this.sessionCookie.expires;
  }

  private async fetchSessionCookie() {
    if (this.getSessionCookieTask == null || this.isExpired()) {
      this.getSessionCookieTask = (async () => {
        const cookieJar = new CookieJar();

        await this.httpClient.post("login/anonymous", {
          cookieJar,
          headers: {
            "client-id": "NEXT"
          }
        });

        const cookies = await cookieJar.getCookies("https://www.nordnet.fi");

        const sessionCookie = cookies.find(cookie => cookie.key === "NEXT");

        if (sessionCookie == null) {
          throw new Error("Session cookie not set");
        }

        return sessionCookie;
      })();
    }

    return this.getSessionCookieTask;
  }

  async getSessionId(): Promise<string> {
    const sessionCookie = await this.fetchSessionCookie();
    return sessionCookie.value;
  }
}
