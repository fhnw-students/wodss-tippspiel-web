import Vue from 'vue';

import { classToPlain, plainToClass } from 'class-transformer';

import { Tip } from '@/models/Tip';
import { Game } from '@/models/Game';
import { Score } from '@/models/Score';
import { NewGame } from '@/models/NewGame';
import { GamePhase } from '@/models/GamePhase';

export async function getAllGames(): Promise<Game[]> {
  const response = await Vue.$http.get(`/games`);
  return plainToClass<Game, Game[]>(Game, response.data);
}

export async function updateGame(gameId: number, score: Score): Promise<Game> {
  const response = await Vue.$http.put(`/games/${gameId}`, classToPlain(score));
  return plainToClass<Game, Game>(Game, response.data);
}

export async function createGame(game: NewGame): Promise<Game> {
  const response = await Vue.$http.post(`/games`, classToPlain(game));
  return plainToClass<Game, Game>(Game, response.data);
}

export async function updateTip(gameId: number, score: Score): Promise<Tip> {
  const response = await Vue.$http.put(`/games/${gameId}/tip`, classToPlain(score));
  return plainToClass<Tip, Tip>(Tip, response.data);
}
