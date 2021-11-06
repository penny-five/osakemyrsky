import { Inject, Injectable } from "@nestjs/common";
import { Transaction } from "objection";

import { isAfter, isSameDay } from "../../utils/dates";
import { CrudService } from "../database/common/service/crud.service";
import { League } from "../database/models/league.model";
import { Member } from "../database/models/member.model";
import { User } from "../database/models/user.model";

export enum LeaguesOrderBy {
  NAME = "name"
}

export interface CreateLeagueParams {
  creatorId: string;
  name: string;
  startDate: string;
  endDate: string;
}

export interface RegisterMemberParams {
  userId: string;
  companyName: string;
}

@Injectable()
export class LeagueService extends CrudService<League, LeaguesOrderBy> {
  static searchColumn = "name";

  constructor(
    @Inject(League) leagueModel: typeof League,
    @Inject(Member) private readonly memberModel: typeof Member,
    @Inject(User) private readonly userModel: typeof User
  ) {
    super(leagueModel);
  }

  async findUserMemberships(userId: string, trx?: Transaction) {
    const memberships = await this.userModel.relatedQuery("memberships", trx).for(userId).withGraphFetched({
      league: true
    });

    return memberships;
  }

  async findLeagueMembers(leagueId: string, trx?: Transaction) {
    const members = await this.model.relatedQuery("members", trx).for(leagueId);
    return members;
  }

  async findMemberById(memberId: string, trx?: Transaction) {
    const member = await this.memberModel.query(trx).findById(memberId);
    return member;
  }

  async createLeague(params: CreateLeagueParams, trx?: Transaction) {
    if (isAfter(params.startDate, params.endDate)) {
      throw new Error("League end date cannot be before league start date");
    }

    if (isSameDay(params.startDate, params.endDate)) {
      throw new Error("League cannot start and end on the same day");
    }

    return this.model.query(trx).insertAndFetch({
      name: params.name,
      creatorId: params.creatorId,
      startDate: params.startDate,
      endDate: params.endDate
    });
  }

  async registerMember(leagueId: string, params: RegisterMemberParams, trx?: Transaction) {
    return this.model.transaction(trx!, async trx2 => {
      const league = await this.findById(leagueId, trx2);

      if (league == null) {
        throw new Error("League not found");
      }

      if (league.hasEndedOn(new Date())) {
        throw new Error("League has already ended");
      }

      const user = await this.userModel.query(trx2).findById(params.userId);

      if (user == null) {
        throw new Error("User not found");
      }

      const membership = await this.memberModel.query(trx2).insertAndFetch({
        leagueId: leagueId,
        userId: params.userId,
        companyName: params.companyName
      });

      return membership;
    });
  }
}
