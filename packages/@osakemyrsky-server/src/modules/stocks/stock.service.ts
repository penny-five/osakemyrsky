import { Injectable } from "@nestjs/common";

import { NordnetClient } from "../nordnet/client";
import { NordnetInstrument, NordnetInstrumentTradingStatus } from "../nordnet/client/types";

import { Stock, StockTradingStatus } from "./dto/stock.dto";

@Injectable()
export class StockService {
  constructor(private readonly nordnetClient: NordnetClient) {}

  async search(search: string) {
    const response = await this.nordnetClient.searchInstruments(search);

    return response.results.map(instrument => this.mapNordnetInstrumentToStock(instrument));
  }

  async findStockBySymbol(symbol: string) {
    const instrument = await this.nordnetClient.findInstrumentBySymbol(symbol);
    return instrument != null ? this.mapNordnetInstrumentToStock(instrument) : undefined;
  }

  private mapNordnetInstrumentToStock(instrument: NordnetInstrument) {
    const dto = new Stock();

    dto.name = instrument.instrument_info.name;
    dto.symbol = instrument.instrument_info.symbol;
    dto.exchangeCountry = instrument.exchange_info.exchange_country;
    dto.price = instrument.price_info.last.price || instrument.price_info.close.price;
    dto.priceDiff = instrument.price_info.diff?.diff ?? 0.0;
    dto.priceDiffPct = instrument.price_info.diff_pct ?? 0.0;

    switch (instrument.status_info.trading_status) {
      case NordnetInstrumentTradingStatus.OPEN:
        dto.tradingStatus = StockTradingStatus.OPEN;
        break;
      case NordnetInstrumentTradingStatus.CLOSED:
        dto.tradingStatus = StockTradingStatus.CLOSED;
        break;
      case NordnetInstrumentTradingStatus.UNKNOWN:
        dto.tradingStatus = StockTradingStatus.UNKNOWN;
        break;
      default:
        dto.tradingStatus = null;
    }

    return dto;
  }
}
