import Vue from 'vue';

import { classToPlain, plainToClass } from 'class-transformer';

import { Game } from '@/models/Game';
import { GamePhase } from '@/models/GamePhase';
import { Tip } from '@/models/Tip';

export async function getGamePhases(): Promise<GamePhase[]> {
  const response = await Vue.$http.get(`/game-phases`);
  return plainToClass<GamePhase, GamePhase[]>(GamePhase, response.data);
}
