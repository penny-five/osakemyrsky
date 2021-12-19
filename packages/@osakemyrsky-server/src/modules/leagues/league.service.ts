import { Firestore } from "@google-cloud/firestore";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { v4 as uuid } from "uuid";

import { Editor } from "../../common/editor";
import { isAfter, isSameDay } from "../../utils/dates";
import { GameConfig } from "../config/files/game";
import { DepositService } from "../deposits/deposit.service";
import { League, leagueConverter, LeagueStatus } from "../firestore/models/league.model";
import { Member, memberConverter } from "../firestore/models/member.model";
import { membershipConverter } from "../firestore/models/membership.model";
import { UserService } from "../users/user.service";

export enum LeaguesOrderBy {
  NAME = "name"
}

@Injectable()
export class LeagueService {
  private readonly gameConfig: GameConfig;

  constructor(
    configService: ConfigService,
    private readonly firestore: Firestore,
    private readonly userService: UserService,
    private readonly depositService: DepositService
  ) {
    this.gameConfig = configService.get<GameConfig>("game")!;
  }

  async findLeagueById(leagueId: string) {
    const res = await this.firestore.collection("leagues").withConverter(leagueConverter).doc(leagueId).get();
    return res.data();
  }

  async findMemberByUserId(leagueId: string, userId: string) {
    const res = await this.firestore
      .collection("leagues")
      .doc(leagueId)
      .collection("members")
      .withConverter(memberConverter)
      .where("userId", "==", userId)
      .get();

    return res.empty ? undefined : res.docs[0].data();
  }

  async findMemberLeague(memberId: string) {
    const res = await this.firestore.collection("members").withConverter(leagueConverter).doc(memberId).parent.get();
    return res.empty ? undefined : res.docs[0].data();
  }

  async findAll(orderBy = LeaguesOrderBy.NAME) {
    const res = await this.firestore.collection("leagues").withConverter(leagueConverter).orderBy(orderBy).get();
    return res.docs.map(doc => doc.data());
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

  async createLeague(params: Pick<League, "name" | "startDate" | "endDate">, editor: Editor) {
    if (isAfter(params.startDate, params.endDate)) {
      throw new Error("League end date cannot be before league start date");
    }

    if (isSameDay(params.startDate, params.endDate)) {
      throw new Error("League cannot start and end on the same day");
    }

    const user = await this.userService.findUserById(editor.userId);

    if (user == null) {
      throw new Error("User not found");
    }

    const id = uuid();

    const leagueRef = this.firestore.collection("leagues").doc(id).withConverter(leagueConverter);

    await leagueRef.create({
      name: params.name,
      startDate: params.startDate,
      endDate: params.endDate,
      status: LeagueStatus.UNKNOWN,
      creator: {
        name: user.name,
        picture: user.picture,
        userId: user.id!
      }
    });

    const res = await leagueRef.get();
    return res.data()!;
  }

  async registerMember(leagueId: string, userId: string, params: Pick<Member, "companyName">) {
    const league = await this.findLeagueById(leagueId);

    if (league == null) {
      throw new Error("League not found");
    }

    if (this.hasLeagueEndedOn(league, new Date())) {
      throw new Error("League has already ended");
    }

    const user = await this.userService.findUserById(userId);

    if (user == null) {
      throw new Error("User not found");
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
          ...user,
          userId: user.id!,
          companyName: params.companyName
        })
        .create(membershipRef, {
          companyName: params.companyName,
          leagueId: league.id!,
          leagueName: league.name
        });
    });

    await this.depositService.placeDeposit(leagueId, memberId, this.gameConfig.initialDepositEuros * 100);

    const res = await membershipRef.get();
    return res.data()!;
  }

  /**
   * Returns the member current cash amoun in cents.
   */
  async getMemberCurrentCashAmount(leagueId: string, memberId: string) {
    const deposits = await this.depositService.getMemberDeposits(leagueId, memberId);

    return deposits.reduce((sum, deposit) => {
      return sum + deposit.valueCents;
    }, 0);
  }

  async isLeagueOngoing(leagueId: string) {
    const league = await this.findLeagueById(leagueId);
    const now = new Date();

    return league != null && this.hasLeagueStartedOn(league, now) && !this.hasLeagueEndedOn(league, now);
  }

  private hasLeagueEndedOn(league: League, date: Date | string) {
    return isAfter(date, league.endDate);
  }

  private hasLeagueStartedOn(league: League, date: Date | string) {
    return isAfter(date, league.startDate);
  }
}
