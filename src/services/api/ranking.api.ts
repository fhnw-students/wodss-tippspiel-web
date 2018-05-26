import Vue from 'vue';

import { classToPlain, plainToClass, deserialize } from 'class-transformer';

import { PagedUserRanking } from '@/models/PagedUserRanking';
import { TeamRanking } from '@/models/TeamRanking';

export async function getUserRanking(offset: number, limit: number): Promise<PagedUserRanking> {
  const response = await Vue.$http.get(`/ranking/users?offset=${offset}&limit=${limit}`);
  return plainToClass<PagedUserRanking, PagedUserRanking>(PagedUserRanking, response.data);
}

export async function getTeamRanking(): Promise<TeamRanking[]> {
  const response = await Vue.$http.get(`/ranking/users`);
  return plainToClass<TeamRanking, TeamRanking[]>(TeamRanking, response.data);
}

export async function getAmountOfRankings(): Promise<number> {
  const response = await Vue.$http.get(`/ranking/users/amount`);
  return response.data;
}
