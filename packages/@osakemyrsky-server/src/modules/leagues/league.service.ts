import { Firestore } from "@google-cloud/firestore";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { v4 as uuid } from "uuid";

import { Editor } from "../../common/editor";
import { DocumentNotFoundError, LeagueInactiveError } from "../../common/errors";
import { formatISODate, isAfter, isSameDay, isSameDayOrAfter } from "../../utils/dates";
import { GameConfig } from "../config/files/game";
import { DepositService } from "../deposits/deposit.service";
import { Deposit } from "../firestore/models/deposit.model";
import { League, leagueConverter } from "../firestore/models/league.model";
import { Member, memberConverter } from "../firestore/models/member.model";
import { membershipConverter } from "../firestore/models/membership.model";
import { Transaction, TransactionType } from "../firestore/models/transaction.model";
import { StockService } from "../stocks/stock.service";
import { TransactionService } from "../transactions/transaction.service";
import { UserService } from "../users/user.service";

export enum LeaguesOrderBy {
  NAME = "name"
}

@Injectable()
export class LeagueService {
  constructor(
    @Inject(GameConfig.KEY) private readonly gameConfig: ConfigType<typeof GameConfig>,
    private readonly firestore: Firestore,
    private readonly userService: UserService,
    private readonly depositService: DepositService,
    private readonly transactionService: TransactionService,
    private readonly stockService: StockService
  ) {}

  async findLeagueById(leagueId: string) {
    const res = await this.firestore.collection("leagues").withConverter(leagueConverter).doc(leagueId).get();
    return res.data();
  }

  async findAllLeagues(orderBy = LeaguesOrderBy.NAME) {
    const res = await this.firestore.collection("leagues").withConverter(leagueConverter).orderBy(orderBy).get();
    return res.docs.map(doc => doc.data());
  }

  async findActiveLeagues() {
    const now = new Date();

    const res = await this.firestore
      .collection("leagues")
      .withConverter(leagueConverter)
      .where("startDate", "<=", now)
      .get();

    return res.docs.map(doc => doc.data()).filter(league => isSameDayOrAfter(league.endDate, now));
  }

  async findMemberById(leagueId: string, memberId: string) {
    const res = await this.firestore
      .collection("leagues")
      .doc(leagueId)
      .collection("members")
      .where("id", "==", memberId)
      .withConverter(memberConverter)
      .get();

    return res.empty ? undefined : res.docs[0].data();
  }

  async findMemberByUserId(leagueId: string, userId: string) {
    const res = await this.firestore
      .collection("leagues")
      .doc(leagueId)
      .collection("members")
      .withConverter(memberConverter)
      .where("user.id", "==", userId)
      .get();

    return res.empty ? undefined : res.docs[0].data();
  }

  async findUserMemberships(id: string) {
    const res = await this.firestore
      .collection("users")
      .doc(id)
      .collection("memberships")
      .withConverter(membershipConverter)
      .get();

    return res.docs.map(doc => doc.data());
  }

  async findLeagueMembers(leagueId: string) {
    const res = await this.firestore
      .collection("leagues")
      .doc(leagueId)
      .collection("members")
      .withConverter(memberConverter)
      .get();

    return res.docs.map(doc => doc.data());
  }

  /**
   * Creates a new league using the provided params.
   *
   * @param params League params
   * @param editor Editor information
   * @returns Created league document
   */
  async createLeague(params: Pick<League, "name" | "startDate" | "endDate">, editor: Editor) {
    if (isAfter(params.startDate, params.endDate)) {
      throw new Error("League end date cannot be before league start date");
    }

    if (isSameDay(params.startDate, params.endDate)) {
      throw new Error("League cannot start and end on the same day");
    }

    const user = await this.userService.findUserById(editor.userId);

    if (user == null) {
      throw new DocumentNotFoundError("user", editor.userId);
    }

    const id = uuid();

    const leagueRef = this.firestore.collection("leagues").doc(id).withConverter(leagueConverter);

    await leagueRef.create({
      name: params.name,
      startDate: params.startDate,
      endDate: params.endDate,
      creator: {
        id: user.id!,
        name: user.name,
        picture: user.picture
      }
    });

    const res = await leagueRef.get();
    return res.data()!;
  }

  /**
   * Registers a new league member using the provided params.
   *
   * @param leagueId League ID
   * @param userId User ID
   * @param params Registration params
   * @returns Created membership document
   */
  async registerMember(leagueId: string, userId: string, params: Pick<Member, "companyName">) {
    const league = await this.findLeagueById(leagueId);

    if (league == null) {
      throw new DocumentNotFoundError("league", leagueId);
    }

    if (this.hasLeagueEndedOn(league, new Date())) {
      throw new LeagueInactiveError();
    }

    const user = await this.userService.findUserById(userId);

    if (user == null) {
      throw new DocumentNotFoundError("user", userId);
    }

    const memberId = uuid();
    const membershipId = uuid();

    const memberRef = this.firestore
      .collection("leagues")
      .doc(leagueId)
      .collection("members")
      .withConverter(memberConverter)
      .doc(memberId);

    const membershipRef = this.firestore
      .collection("users")
      .doc(user.id!)
      .collection("memberships")
      .withConverter(membershipConverter)
      .doc(membershipId);

    // eslint-disable-next-line @typescript-eslint/require-await
    await this.firestore.runTransaction<void>(async trx => {
      trx
        .create(memberRef, {
          id: memberId,
          league: {
            id: league.id!,
            name: league.name
          },
          user: {
            id: user.id!,
            name: user.name,
            picture: user.picture
          },
          companyName: params.companyName,
          balanceCents: 0,
          balanceUpdatedAt: new Date().toISOString(),
          balanceHistory: {}
        })
        .create(membershipRef, {
          league: {
            id: league.id!,
            name: league.name
          },
          member: {
            id: memberId,
            companyName: params.companyName
          }
        });
    });

    await this.depositService.placeDeposit(leagueId, memberId, this.gameConfig.initialDepositEuros * 100);

    await this.refreshMemberBalance(leagueId, memberId);

    const res = await membershipRef.get();
    return res.data()!;
  }

  /**
   * Returns the member current cash amount in cents.
   */
  async getMemberCurrentCashAmount(leagueId: string, memberId: string) {
    const deposits = await this.depositService.getMemberDeposits(leagueId, memberId);
    const transactions = await this.transactionService.getMemberTransactions(leagueId, memberId);
    return this.computeDepositTotalValue(deposits) + this.computeTransactionTotalValue(transactions);
  }

  /**
   * Computes up-to-date balance for a single league member.
   *
   * Takes into account any deposits, transactions and the current value of all owned stocks.
   *
   * @param leagueId League ID
   * @param memberId Member ID
   * @returns Member balance in cents
   */
  async computeMemberBalance(leagueId: string, memberId: string) {
    const deposits = await this.depositService.getMemberDeposits(leagueId, memberId);
    const transactions = await this.transactionService.getMemberTransactions(leagueId, memberId);

    const totalMemberDepositValue = this.computeDepositTotalValue(deposits);

    const totalMemberTransactionValue = this.computeTransactionTotalValue(transactions);

    const ownedStocksBySymbol = transactions.reduce((acc, transaction) => {
      if (acc[transaction.stock.symbol] == null) {
        acc[transaction.stock.symbol] = 0;
      }

      if (transaction.type === TransactionType.BUY) {
        acc[transaction.stock.symbol] += transaction.count;
      } else {
        acc[transaction.stock.symbol] -= transaction.count;
      }
      return acc;
    }, {} as Record<string, number>);

    const currentPortfolioValue = (
      await Promise.all(
        Object.entries(ownedStocksBySymbol).map(async ([symbol, count]) => this.computeStockCurrentValue(symbol, count))
      )
    ).reduce((sum, value) => sum + value, 0);

    return totalMemberDepositValue + totalMemberTransactionValue + currentPortfolioValue;
  }

  /**
   * Computes updated balance for a single league member.
   *
   * Also adds/updates an daily entry in `balanceHistory` record.
   *
   * @param leagueId League ID
   * @param memberId Member ID
   */
  async refreshMemberBalance(leagueId: string, memberId: string) {
    const balanceCents = await this.computeMemberBalance(leagueId, memberId);

    const now = new Date();

    await this.firestore
      .collection("leagues")
      .doc(leagueId)
      .collection("members")
      .doc(memberId)
      .withConverter(memberConverter)
      .update({
        balanceCents,
        balanceUpdatedAt: now.toISOString(),
        [`balanceHistory.${formatISODate(now)}` as never]: balanceCents
      });
  }

  /**
   * Computes and saves updated balance for each league member.
   *
   * @param leagueId League ID
   */
  async refreshLeagueBalances(leagueId: string) {
    const members = await this.findLeagueMembers(leagueId);

    for (const member of members) {
      await this.refreshMemberBalance(leagueId, member.id!);
    }
  }

  /**
   * Checks if a league is ongoing on the given date. League is ongoing if
   * all of the following are true:
   * - League start date is before or on the same day as the given date
   * - League end date is after or on the same day as the given date.
   *
   * @param leagueId League ID
   * @param date Date to compare to. Uses current date if not defined
   * @returns Boolean value depending on if the league is ongoing or not on the given date
   */
  async isLeagueOngoing(leagueId: string, date: string | Date = new Date()) {
    const league = await this.findLeagueById(leagueId);

    if (league == null) {
      return false;
    }

    return this.hasLeagueStartedOn(league, date) && !this.hasLeagueEndedOn(league, date);
  }

  private hasLeagueEndedOn(league: League, date: Date | string) {
    return isAfter(date, league.endDate);
  }

  private hasLeagueStartedOn(league: League, date: Date | string) {
    return isAfter(date, league.startDate);
  }

  private computeTransactionTotalValue(transactions: Transaction[]) {
    return transactions.reduce((total, transaction) => {
      if (transaction.type === TransactionType.BUY) {
        return total - transaction.count * transaction.unitPriceCents;
      } else {
        return total + transaction.count * transaction.unitPriceCents;
      }
    }, 0);
  }

  private computeDepositTotalValue(deposits: Deposit[]) {
    return deposits.reduce((total, deposit) => {
      return total + deposit.valueCents;
    }, 0);
  }

  private async computeStockCurrentValue(symbol: string, count: number) {
    if (count <= 0) {
      return 0;
    }

    const stock = await this.stockService.findStockBySymbol(symbol);

    return count * (stock?.priceCents ?? 0);
  }
}
