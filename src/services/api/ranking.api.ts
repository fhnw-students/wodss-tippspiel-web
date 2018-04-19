import { TeamRanking } from './../../models/TeamRanking';
import { Tip } from '@/models/Tip';
import Vue from 'vue';

import { plainToClass, classToPlain } from 'class-transformer';

import { Team } from '@/models/Team';
import { UserRanking } from '@/models/UserRanking';
import { NewTeam } from '@/models/NewTeam';
import { GamePhase } from '@/models/GamePhase';
import { Game } from '@/models/Game';

export async function getUserRanking(): Promise<UserRanking[]> {
  const response = await Vue.$fetchClient()
    .fetchGet(`/api/ranking/users`);

  if (response.status === 200) {
    const body = await response.json();
    return plainToClass<UserRanking, UserRanking[]>(UserRanking, body);
  }

  throw new Error('Could not load user ranking');
}

export async function getTeamRanking(): Promise<TeamRanking[]> {
  const response = await Vue.$fetchClient()
    .fetchGet(`/api/ranking/users`);

  if (response.status === 200) {
    const body = await response.json();
    return plainToClass<TeamRanking, TeamRanking[]>(TeamRanking, body);
  }

  throw new Error('Could not load team ranking');
}
