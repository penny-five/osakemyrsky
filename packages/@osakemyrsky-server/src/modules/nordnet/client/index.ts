import { Injectable } from "@nestjs/common";
import got from "got";

import { NordnetSessionCache } from "./session-cache";
import { NordnetInstrument, NordnetPaginatedResponse } from "./types";

export interface SearchInstrumentsParams {
  exchangeList?: string;
  exchangeCountry?: string;
  limit?: number;
}

@Injectable()
export class NordnetClient {
  private httpClient: typeof got;

  private sessionCache: NordnetSessionCache = new NordnetSessionCache();

  constructor() {
    this.httpClient = got.extend({
      prefixUrl: "https://www.nordnet.fi/api/2",
      headers: {
        "client-id": "NEXT"
      }
    });
  }

  private async get<T>(url: string, searchParams?: Record<string, string | number | boolean>): Promise<T> {
    const sessionId = await this.sessionCache.getSessionId();

    const response = await this.httpClient
      .get(url, {
        searchParams,
        headers: {
          cookie: `NEXT=${sessionId};`
        }
      })
      .json<T>();

    return response;
  }

  async searchInstruments(search: string, params?: SearchInstrumentsParams) {
    return this.get<NordnetPaginatedResponse<NordnetInstrument>>("instrument_search/query/stocklist", {
      free_text_search: search,
      limit: params?.limit ?? 10
    });
  }

  async findInstrumentByInstrumentId(instrumentId: string) {
    const response = await this.get<NordnetPaginatedResponse<NordnetInstrument>>("instrument_search/query/stocklist", {
      apply_filters: `instrument_id=${instrumentId}`,
      limit: 1
    });

    return response.results[0];
  }

  async findInstrumentBySymbol(symbol: string) {
    const response = await this.get<NordnetPaginatedResponse<NordnetInstrument>>("instrument_search/query/stocklist", {
      apply_filters: `symbol=${symbol}`,
      limit: 1
    });

    return response.results[0];
  }
}
