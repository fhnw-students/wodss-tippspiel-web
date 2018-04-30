import { GameNation } from './GameNation';
import { Type } from 'class-transformer';

import { GamePhase } from './GamePhase';
import { Location } from '@/models/Location';
import { Tip } from '@/models/Tip';

export class Game {
  public id: number;
  public date: Date;

  @Type(() => GamePhase)
  public phase: GamePhase;

  @Type(() => Location)
  public location: Location;

  @Type(() => GameNation)
  public host: GameNation;

  @Type(() => GameNation)
  public guest: GameNation;

  @Type(() => Tip)
  public tip: Tip;

  public get isPlayed(): boolean {
    return !!this.host.score && !!this.guest.score && this.host.score >= 0 && this.guest.score >= 0;
  }

}
