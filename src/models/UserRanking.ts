import { Type } from 'class-transformer';

import { Ranking } from '@/models/Ranking';
import { User } from '@/models/User';

export class UserRanking extends Ranking {

  @Type(() => User)
  public user: User;
}
