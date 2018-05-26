import { User } from './User';
import { Team } from '@/models/Team';

export class TeamInvitation {
  public id: number;
  public email: string;
  public team: Team;
}
