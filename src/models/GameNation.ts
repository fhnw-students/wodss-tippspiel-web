import { Type } from 'class-transformer';

import { Nation } from './Nation';

export class GameNation {
  public score: number;

  @Type(() => Nation)
  public nation: Nation;
}
