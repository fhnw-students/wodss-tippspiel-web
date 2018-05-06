import { Nation } from '@/models/Nation';
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
    return this.host.score !== null && this.guest.score !== null && this.host.score >= 0 && this.guest.score >= 0;
  }

  public get isTipped(): boolean {
    return this.tip && this.tip.hostScore !== null && this.tip.guestScore !== null && this.tip.hostScore >= 0 && this.tip.guestScore >= 0;
  }

  public get hasCorrectTip(): boolean {
    if (this.isPlayed && this.isTipped) {
      return this.host.score === this.tip.hostScore && this.guest.score === this.tip.guestScore;
    }
    return false;
  }

}
