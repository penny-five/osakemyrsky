import { URL } from "url";

import { Injectable } from "@nestjs/common";
import { gotScraping } from "got-scraping";

import { NordnetRequestCache } from "./response-cache";
import { NordnetSessionCache } from "./session-cache";
import { NordnetInstrument, NordnetPaginatedResponse } from "./types";

export interface SearchInstrumentsParams {
  exchangeList?: string;
  exchangeCountry?: string;
  limit?: number;
}

@Injectable()
export class NordnetClient {
  private httpClient: typeof gotScraping;

  private requestCache = new NordnetRequestCache();

  private sessionCache = new NordnetSessionCache();

  constructor() {
    this.httpClient = gotScraping.extend({
      prefixUrl: "https://www.nordnet.fi/api/2",
      headers: {
        "client-id": "NEXT",
        referer: "https://www.nordnet.fi/"
      },
      hooks: {
        beforeRequest: [
          options => {
            if (options.context.ignoreCache) {
              return;
            }

            return this.requestCache.get((options.url as URL).href);
          }
        ],
        afterResponse: [
          response => {
            this.requestCache.set(response.requestUrl.toString(), response);
            return response;
          }
        ]
      }
    });
  }

  async searchInstruments(search: string, params?: SearchInstrumentsParams) {
    return this.get<NordnetPaginatedResponse<NordnetInstrument>>("instrument_search/query/stocklist", {
      searchParams: {
        free_text_search: search,
        limit: params?.limit ?? 10
      }
    });
  }

  async findInstrumentByInstrumentId(instrumentId: string) {
    const response = await this.get<NordnetPaginatedResponse<NordnetInstrument>>("instrument_search/query/stocklist", {
      searchParams: {
        apply_filters: `instrument_id=${instrumentId}`,
        limit: 1
      }
    });

    return response.results.length > 0 ? response.results[0] : undefined;
  }

  async findInstrumentBySymbol(symbol: string) {
    const response = await this.get<NordnetPaginatedResponse<NordnetInstrument>>("instrument_search/query/stocklist", {
      searchParams: {
        apply_filters: `symbol=${symbol}`,
        limit: 1
      }
    });

    return response.results.length > 0 ? response.results[0] : undefined;
  }

  private async get<T>(
    url: string,
    {
      searchParams = {},
      ignoreCache = false
    }: { searchParams?: Record<string, string | number | boolean>; ignoreCache?: boolean } = {
      searchParams: {},
      ignoreCache: false
    }
  ): Promise<T> {
    const sessionId = await this.sessionCache.getSessionId();

    const response = await this.httpClient
      .get(url, {
        searchParams,
        headers: {
          cookie: `NEXT=${sessionId};`
        },
        context: {
          ignoreCache
        }
      })
      .json<T>();

    return response;
  }
}
