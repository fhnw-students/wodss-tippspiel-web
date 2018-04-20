import Vue from 'vue';

import { classToPlain, plainToClass } from 'class-transformer';

import { UserRanking } from '@/models/UserRanking';
import { TeamRanking } from '@/models/TeamRanking';

export async function getUserRanking(): Promise<UserRanking[]> {
  const response = await Vue.$http.get(`/api/ranking/users`);
  return plainToClass<UserRanking, UserRanking[]>(UserRanking, response.data);
}

export async function getTeamRanking(): Promise<TeamRanking[]> {
  const response = await Vue.$http.get(`/api/ranking/users`);
  return plainToClass<TeamRanking, TeamRanking[]>(TeamRanking, response.data);
}
