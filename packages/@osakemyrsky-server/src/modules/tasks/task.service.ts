import { Injectable, Logger } from "@nestjs/common";
import { v4 as uuid } from "uuid";

import { LeagueService } from "../leagues/league.service";
import { OrderService } from "../orders/order.service";

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(private readonly orderService: OrderService, private readonly leagueService: LeagueService) {}

  /**
   * Processes all pending orders.
   */
  async processOrders() {
    const taskId = uuid();

    this.logger.log(
      {
        taskId
      },
      "Start order processing"
    );

    await this.orderService.processOrders();

    this.logger.log(
      {
        taskId
      },
      "End order processing"
    );
  }

  /**
   * Re-calculates balance for each member of each active league.
   */
  async updateBalances() {
    const taskId = uuid();

    this.logger.log(
      {
        taskId
      },
      "Start balance processing"
    );

    let processedLeaguesCount = 0;
    let processedMembersCount = 0;

    const activeLeagues = await this.leagueService.findActiveLeagues();

    for (const league of activeLeagues) {
      const members = await this.leagueService.findLeagueMembers(league.id!);

      for (const member of members) {
        await this.leagueService.refreshMemberBalance(league.id!, member.id!);
        processedMembersCount += 1;
      }
      processedLeaguesCount += 1;
    }

    this.logger.log(
      {
        taskId,
        stats: {
          processed: {
            leagues: processedLeaguesCount,
            members: processedMembersCount
          }
        }
      },
      "End balance processing"
    );
  }
}
