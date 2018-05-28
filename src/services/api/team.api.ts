import { TeamUser } from './../../models/TeamUser';
import { User } from './../../models/User';
import Vue from 'vue';

import { classToPlain, plainToClass } from 'class-transformer';

import { NewTeam } from '@/models/NewTeam';
import { Team } from '@/models/Team';
import { UserRanking } from '@/models/UserRanking';

export async function getTeamById(teamId: number): Promise<Team> {
  const response = await Vue.$http.get(`/teams/${teamId}`);
  return plainToClass<Team, Team>(Team, response.data);
}

export async function getTeamUserById(teamId: number): Promise<TeamUser[]> {
  const response = await Vue.$http.get(`/teams/${teamId}/users`);
  return plainToClass<TeamUser, TeamUser[]>(TeamUser, response.data);
}

export async function getMyTeams(): Promise<Team[]> {
  const response = await Vue.$http.get(`/teams/me`);
  return plainToClass<Team, Team[]>(Team, response.data);
}

export async function getTeamRanking(teamId: number): Promise<UserRanking[]> {
  const response = await Vue.$http.get(`/teams/${teamId}/ranking`);
  return plainToClass<UserRanking, UserRanking[]>(UserRanking, response.data);
}

export async function createTeam(newTeam: NewTeam): Promise<Team> {
  const response = await Vue.$http.post(`/teams`, classToPlain(newTeam));
  return plainToClass<Team, Team>(Team, response.data);
}

export async function updateTeam(team: Team): Promise<Team> {
  const response = await Vue.$http.put(`/teams/${team.id}`, classToPlain(team));
  return plainToClass<Team, Team>(Team, response.data);
}

export async function inviteUserToTeam(teamId: number, email: string): Promise<void> {
  await Vue.$http.put(`/teams/${teamId}/users`, undefined, {
    params: { email },
  });
}

export async function deleteUserFromTeam(teamId: number, userId: number): Promise<void> {
  await Vue.$http.delete(`/teams/${teamId}/users/${userId}`);
}
