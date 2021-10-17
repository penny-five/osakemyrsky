import { Query, Resolver, Args } from "@nestjs/graphql";

import { Stock } from "./dto/stock.dto";
import { StockService } from "./stock.service";

@Resolver(() => Stock)
export class StockResolver {
  constructor(private readonly stockService: StockService) {}

  @Query(() => [Stock])
  stocks(@Args("search") search: string) {
    return this.stockService.search(search);
  }

  @Query(() => Stock)
  stock(@Args("symbol") symbol: string) {
    return this.stockService.findBySymbol(symbol);
  }
}
