import { Type } from 'class-transformer';

import { Rule } from './Rule';

export class Tip {
  public hostScore: number;
  public guestScore: number;

  @Type(() => Rule)
  public rules: Rule[];
}
