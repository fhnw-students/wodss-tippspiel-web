import Vue from 'vue';

import { classToPlain, plainToClass } from 'class-transformer';

import { NewTeam } from '@/models/NewTeam';
import { Team } from '@/models/Team';
import { UserRanking } from '@/models/UserRanking';
import { TeamInvitation } from '@/models/TeamInvitation';

export async function acceptById(teamInvitationId: number): Promise<void> {
  await Vue.$http.put(`/team-invitations/${teamInvitationId}`);
}

export async function deleteById(teamInvitationId: number): Promise<void> {
  await Vue.$http.delete(`/team-invitations/${teamInvitationId}`);
}
