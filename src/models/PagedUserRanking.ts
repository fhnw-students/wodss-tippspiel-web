import { Type } from 'class-transformer';

import { Paged } from '@/models/Paged';
import { UserRanking } from '@/models/UserRanking';

export class PagedUserRanking extends Paged {

  @Type(() => UserRanking)
  public content: UserRanking[];
}
