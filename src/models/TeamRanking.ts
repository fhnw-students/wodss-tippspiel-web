import { Type } from 'class-transformer';

import { Ranking } from '@/models/Ranking';
import { Team } from '@/models/Team';

export class TeamRanking extends Ranking {

  @Type(() => Team)
  public team: Team;
}
