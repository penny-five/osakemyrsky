export interface NordnetPaginatedResponse<T> {
  rows: number;
  total_hits: number;
  results: T[];
}

export interface NordnetInstrumentInfo {
  instrument_id: number;
  name: string;
  long_name: string;
  symbol: string;
  instrument_group_type: string;
  instrument_type_hierarchy: string;
  instrument_type: string;
  isin: string;
  currency: string;
  clearing_place: string;
  is_tradable: boolean;
  instrument_pawn_percentage: number;
  is_shortable: boolean;
  issuer_id: number;
  issuer_name: string;
}

export enum NordnetInstrumentTradingStatus {
  OPEN = "OPEN",
  CLOSED = "CLOSED",
  UNKNOWN = "UNKNOWN"
}

export interface NordnetInstrumentStatusInfo {
  trading_status?: NordnetInstrumentTradingStatus | string;
  translated_trading_status?: string;
  tick_timestamp?: number;
}

export interface NordnetInstrumentMarketInfo {
  market_id: number;
  market_sub_id: number;
  identifier: string;
  tick_size_id: number;
}

export interface NordnetInstrumentPriceValue {
  price: number;
  decimals: number;
}

export interface NordnetInstrumentDiffValue {
  diff: number;
  decimals: number;
}

export interface NordnetInstrumentPriceInfo {
  last: NordnetInstrumentPriceValue;
  open: NordnetInstrumentPriceValue;
  close: NordnetInstrumentPriceValue;
  turnover: number;
  turnover_normalized: number;
  turnover_volume: number;
  bid: NordnetInstrumentPriceValue;
  ask: NordnetInstrumentPriceValue;
  bid_volume: number;
  ask_volume: number;
  high: NordnetInstrumentPriceValue;
  low: NordnetInstrumentPriceValue;
  diff?: NordnetInstrumentDiffValue;
  diff_pct?: number;
  spread: NordnetInstrumentPriceValue;
  spread_pct: number;
  tick_timestamp: number;
  realtime: boolean;
}

export interface NordnetInstrumentExchangeInfo {
  exchange_country: string;
}

export interface NordnetInstrumentKeyRatiosInfo {
  pe: number;
  ps: number;
  eps: number;
  pb: number;
  dividend_per_share: number;
  dividend_yield: number;
}

export interface NordnetInstrumentHistoricalReturnsInfo {
  yield_1d: number;
  yield_1w: number;
  yield_1m: number;
  yield_3m: number;
  yield_ytd: number;
  yield_1y: number;
  yield_3y: number;
  realtime: boolean;
}

export interface NordnetInstrumentCompanyInfo {
  general_meeting_date: number;
  report_date: number;
  report_type: string;
  report_description: string;
}

export interface NordnetInstrumentStatisticalInfo {
  statistics_timestamp: number;
  number_of_owners: number;
}

export interface NordnetInstrument {
  instrument_info: NordnetInstrumentInfo;
  status_info: NordnetInstrumentStatusInfo;
  market_info: NordnetInstrumentMarketInfo;
  price_info: NordnetInstrumentPriceInfo;
  exchange_info: NordnetInstrumentExchangeInfo;
  key_ratios_info: NordnetInstrumentKeyRatiosInfo;
  historical_returns_info: NordnetInstrumentHistoricalReturnsInfo;
  company_info: NordnetInstrumentCompanyInfo;
  statistical_info: NordnetInstrumentStatisticalInfo;
}
