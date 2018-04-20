import Vue from 'vue';

import { classToPlain, plainToClass } from 'class-transformer';

import { Game } from '@/models/Game';
import { GamePhase } from '@/models/GamePhase';
import { Tip } from '@/models/Tip';

export async function getGamePhases(): Promise<GamePhase[]> {
  const response = await Vue.$http.get(`/api/game-phases`);
  return plainToClass<GamePhase, GamePhase[]>(GamePhase, response.data);
}

export async function getGames(): Promise<Game[]> {
  const response = await Vue.$http.get(`/api/games`);
  return plainToClass<Game, Game[]>(Game, response.data);
}

export async function updateGame(game: Game): Promise<Game> {
  const response = await Vue.$http.put(`/api/games/${game.id}`, classToPlain(game));
  return plainToClass<Game, Game>(Game, response.data);
}

export async function updateTip(gameId: number, tip: Tip): Promise<Tip> {
  const response = await Vue.$http.put(`/api/games/${gameId}/tip`, classToPlain(tip));
  return plainToClass<Tip, Tip>(Tip, response.data);
}
