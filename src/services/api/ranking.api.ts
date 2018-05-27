import Vue from 'vue';

import { classToPlain, plainToClass, deserialize } from 'class-transformer';

import { PagedUserRanking } from '@/models/PagedUserRanking';
import { TeamRanking } from '@/models/TeamRanking';

export async function getUserRanking(username: string | undefined, page: number, size: number): Promise<PagedUserRanking> {
  const response = await Vue.$http.get(`/ranking/users`, {
    params: {
      username, page, size,
    },
  });
  return plainToClass<PagedUserRanking, PagedUserRanking>(PagedUserRanking, response.data);
}

export async function getTeamUserRanking(teamId: number, page: number, size: number): Promise<TeamRanking[]> {
  const response = await Vue.$http.get(`/ranking/teams/${teamId}`, {
    params: {
      page, size,
    },
  });
  return plainToClass<TeamRanking, TeamRanking[]>(TeamRanking, response.data);
}

export async function getTeamRanking(page: number, size: number): Promise<TeamRanking[]> {
  const response = await Vue.$http.get(`/ranking/teams`, {
    params: {
      page, size,
    },
  });
  return plainToClass<TeamRanking, TeamRanking[]>(TeamRanking, response.data);
}
