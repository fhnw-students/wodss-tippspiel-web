import Vue from 'vue';
import { User } from '@/models/User';
import { Game } from '@/models/Game';
import { Team } from '@/models/Team';
import { plainToClass } from 'class-transformer';

/**
 * Loads the current user from api
 */
export async function getCurrentUser(): Promise<User> {
  const response = await Vue.$http.get(`/users/me`);
  return plainToClass<User, User>(User, response.data);
}

export async function getMyGames(): Promise<Game[]> {
  const response = await Vue.$http.get(`/users/me/games`);
  return plainToClass<Game, Game[]>(Game, response.data);
}

export async function getUserGamesByUsername(username: string): Promise<Game[]> {
  const response = await Vue.$http.get(`/users/${username}/games`);
  return plainToClass<Game, Game[]>(Game, response.data);
}

export async function getMyTeams(): Promise<Team[]> {
  const response = await Vue.$http.get(`/users/me/teams`);
  return plainToClass<Team, Team[]>(Team, response.data);
}
