import { gotScraping } from "got-scraping";
import { CookieJar, Cookie } from "tough-cookie";

export class NordnetSessionCache {
  private httpClient: typeof gotScraping;

  private getSessionCookieTask: Promise<Cookie> | null = null;

  private sessionCookie: Cookie | null = null;

  constructor() {
    this.httpClient = gotScraping.extend({
      prefixUrl: "https://www.nordnet.fi/api/2",
      headers: {
        "client-id": "NEXT",
        referer: "https://www.nordnet.fi/"
      }
    });
  }

  async getSessionId() {
    const sessionCookie = await this.fetchSessionCookie();
    return sessionCookie.value;
  }

  private isExpired() {
    return this.sessionCookie != null && new Date() > this.sessionCookie.expires;
  }

  private async fetchSessionCookie() {
    if (this.getSessionCookieTask == null || this.isExpired()) {
      this.getSessionCookieTask = (async () => {
        const cookieJar = new CookieJar();

        await this.httpClient.post("login/anonymous", {
          cookieJar
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
}
