import Vue from 'vue';

import { classToPlain, plainToClass } from 'class-transformer';

import { Game } from '@/models/Game';
import { GamePhase } from '@/models/GamePhase';
import { Tip } from '@/models/Tip';

export async function getGames(): Promise<Game[]> {
  const response = await Vue.$http.get(`/games`);
  return plainToClass<Game, Game[]>(Game, response.data);
}

export async function updateGame(game: Game): Promise<Game> {
  const response = await Vue.$http.put(`/games/${game.id}`, classToPlain(game));
  return plainToClass<Game, Game>(Game, response.data);
}

export async function updateTip(gameId: number, tip: Tip): Promise<Tip> {
  const response = await Vue.$http.put(`/games/${gameId}/tip`, classToPlain(tip));
  return plainToClass<Tip, Tip>(Tip, response.data);
}
