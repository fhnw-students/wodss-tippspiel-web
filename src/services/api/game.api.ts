import { Tip } from '@/models/Tip';
import Vue from 'vue';

import { plainToClass, classToPlain } from 'class-transformer';

import { Team } from '@/models/Team';
import { UserRanking } from '@/models/UserRanking';
import { NewTeam } from '@/models/NewTeam';
import { GamePhase } from '@/models/GamePhase';
import { Game } from '@/models/Game';

export async function getGamePhases(): Promise<GamePhase[]> {
  const response = await Vue.$fetchClient()
    .fetchGet(`/api/game-phases`);

  if (response.status === 200) {
    const body = await response.json();
    return plainToClass<GamePhase, GamePhase[]>(GamePhase, body);
  }

  throw new Error('Could not load the game phases');
}

export async function getGames(): Promise<Game[]> {
  const response = await Vue.$fetchClient()
    .fetchGet(`/api/games`);

  if (response.status === 200) {
    const body = await response.json();
    return plainToClass<Game, Game[]>(Game, body);
  }

  throw new Error('Could not load the games');
}

export async function updateGame(game: Game): Promise<Game> {
  const response = await Vue.$fetchClient()
    .fetchPut(`/api/games/${game.id}`, classToPlain(game));

  if (response.status === 200) {
    const body = await response.json();
    return plainToClass<Game, Game>(Game, body);
  }

  throw new Error('Could not update the game');
}

export async function updateTip(gameId: number, tip: Tip): Promise<Tip> {
  const response = await Vue.$fetchClient()
    .fetchPut(`/api/games/${gameId}/tip`, classToPlain(tip));

  if (response.status === 200) {
    const body = await response.json();
    return plainToClass<Tip, Tip>(Tip, body);
  }

  throw new Error('Could not update the tip of the game');
}
