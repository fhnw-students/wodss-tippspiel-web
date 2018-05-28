import { Type } from 'class-transformer';

import { TeamRanking } from './TeamRanking';
import { Paged } from '@/models/Paged';

export class PagedTeamRanking extends Paged {

  @Type(() => TeamRanking)
  public content: TeamRanking[];
}
