import { Response } from "got-scraping";
import QuickLRU from "quick-lru";
import ResponseLike from "responselike";

export class NordnetRequestCache {
  private cache: QuickLRU<string, Response<unknown>>;

  constructor() {
    this.cache = new QuickLRU<string, Response<unknown>>({
      maxSize: 100,
      maxAge: 1000 * 60 * 10 // 10 mins
    });
  }

  set(url: string, response: Response) {
    this.cache.set(url, response);
  }

  get(url: string) {
    const value = this.cache.get(url);

    if (value == null) {
      return undefined;
    }

    return new ResponseLike(value.statusCode, {}, value.rawBody, value.url);
  }
}
