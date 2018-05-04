import Vue from 'vue';

import { classToPlain, plainToClass } from 'class-transformer';

import { GamePhase } from '@/models/GamePhase';

export async function getAllGamePhases(): Promise<GamePhase[]> {
  const response = await Vue.$http.get(`/game-phases`);
  return plainToClass<GamePhase, GamePhase[]>(GamePhase, response.data);
}
