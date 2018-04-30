import Vue from 'vue';
import { User } from '@/models/User';
import { Game } from '@/models/Game';
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