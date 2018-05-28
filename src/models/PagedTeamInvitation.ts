import { Type } from 'class-transformer';

import { Paged } from '@/models/Paged';
import { TeamInvitation } from '@/models/TeamInvitation';

export class PagedTeamInvitation extends Paged {

  @Type(() => TeamInvitation)
  public content: TeamInvitation[];
}
