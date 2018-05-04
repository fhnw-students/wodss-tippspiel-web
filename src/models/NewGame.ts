import { Type } from 'class-transformer';

import { GameNation } from '@/models/GameNation';
import { GamePhase } from '@/models/GamePhase';
import { Location } from '@/models/Location';
import { Nation } from '@/models/Nation';
import { Tip } from '@/models/Tip';

export class NewGame {
  public id: number;
  public date: Date;

  @Type(() => GamePhase)
  public phase: GamePhase;

  @Type(() => Location)
  public location: Location;

  @Type(() => Nation)
  public host: Nation;

  @Type(() => Nation)
  public guest: Nation;

  public static buildNewGame(phase: GamePhase, location: Location, date: Date, host: Nation, guest: Nation): NewGame {
    const game = new NewGame();
    game.date = date;
    game.phase = phase;
    game.location = location;
    game.host = host;
    game.guest = guest;
    return game;
  }

}
