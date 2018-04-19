import Vue from 'vue';

import { plainToClass, classToPlain } from 'class-transformer';

import { Team } from '@/models/Team';
import { UserRanking } from '@/models/UserRanking';
import { NewTeam } from '@/models/NewTeam';

export async function getTeamById(teamId: number): Promise<Team> {
  const response = await Vue.$fetchClient()
    .fetchGet(`/api/teams/${teamId}`);

  if (response.status === 200) {
    const body = await response.json();
    return plainToClass<Team, Team>(Team, body);
  }

  throw new Error('Could not load teams by id');
}

export async function getMyTeams(): Promise<Team[]> {
  const response = await Vue.$fetchClient()
    .fetchGet(`/api/teams/me`);

  if (response.status === 200) {
    const body = await response.json();
    return plainToClass<Team, Team[]>(Team, body);
  }

  throw new Error('Could not load my teams');
}

export async function getTeamRanking(teamId: number): Promise<UserRanking[]> {
  const response = await Vue.$fetchClient()
    .fetchGet(`/api/teams/${teamId}/ranking`);

  if (response.status === 200) {
    const body = await response.json();
    return plainToClass<UserRanking, UserRanking[]>(UserRanking, body);
  }

  throw new Error('Could not load the team-ranking by id');
}

export async function createTeam(newTeam: NewTeam): Promise<Team> {
  const response = await Vue.$fetchClient()
    .fetchPost(`/api/teams`, classToPlain(newTeam));

  if (response.status === 200) {
    const body = await response.json();
    return plainToClass<Team, Team>(Team, body);
  }

  throw new Error('Could not create the team');
}

export async function updateTeam(team: Team): Promise<Team> {
  const response = await Vue.$fetchClient()
    .fetchPut(`/api/teams/${team.id}`, classToPlain(team));

  if (response.status === 200) {
    const body = await response.json();
    return plainToClass<Team, Team>(Team, body);
  }

  throw new Error('Could not update the team');
}

export async function inviteUserToTeam(teamId: number, email: string): Promise<void> {
  const response = await Vue.$fetchClient()
    .fetchPut(`/api/teams/${teamId}/user`, undefined, `?email=${email}`);

  if (response.status === 200) {
    return;
  }

  throw new Error('Could not invite user to the team');
}

export async function acceptInvitationForTeam(teamId: number): Promise<void> {
  const response = await Vue.$fetchClient()
    .fetchPut(`/api/teams/${teamId}/user/me`);

  if (response.status === 200) {
    return;
  }

  throw new Error('Could not accept invitation for the team');
}

export async function deleteTeam(teamId: number): Promise<void> {
  const response = await Vue.$fetchClient()
    .fetchDelete(`/api/teams/${teamId}`);

  if (response.status === 204) {
    return;
  }

  throw new Error('Could not delete the team by id');
}
