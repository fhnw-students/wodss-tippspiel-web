<template>
  <tr >
    <td>
      <router-link :to="{ name: 'team.detail', params: { teamId: invitation.team.id.toString() } }" class="btn btn-link">
        {{ invitation.team.name }}
      </router-link>
    </td>

    <td class="actions">

      <button
        type="button"
        :disabled="isAccepting || isDening"
        @click="onAcceptInvitation(invitation)"
        class="btn btn-success">
        <span v-if="!isAccepting">
          <i class="fas fa-check"></i>
          {{$t('teams.invitation_accept')}}
        </span>
        <Spinner v-if="isAccepting"></Spinner>
      </button>

      <button
        type="button"
        :disabled="isAccepting || isDening"
        @click="onDenyInvitation(invitation)"
        class="btn btn-danger">
        <span v-if="!isDening">
          <i class="fas fa-times"></i>
          {{$t('teams.invitation_deny')}}
        </span>
        <Spinner v-if="isDening"></Spinner>
      </button>

    </td>

  </tr>
</template>


<script lang="ts">
import { Prop, Component, Vue, Watch } from 'vue-property-decorator';

import { TeamInvitation } from '@/models/TeamInvitation';
import * as teamInvitationApi from '@/services/api/teamInvitation.api';
import Spinner from '@/components/layout/Spinner.vue';
import { throws } from 'assert';

@Component({
  components: {
    Spinner,
  },
})
export default class TeamInvitationRow extends Vue {

  @Prop()
  public invitation: TeamInvitation;

  public isAccepting: boolean = false;
  public isDening: boolean = false;

  public async onAcceptInvitation(): Promise<void> {
    this.isAccepting = true;
    try {
      await teamInvitationApi.acceptById(this.invitation.team.id);
    } catch (_) {
      this.$noty.error('message.team_invitation_accept_failed');
      return;
    } finally {
      this.isAccepting = false;
    }

    this.$noty.success('message.team_invitation_accept_successful');
    this.$eventBus.$emit('TEAM_INVITATION.ACCEPTED');
  }

  public async onDenyInvitation(): Promise<void> {
    this.isDening = true;
    try {
      await teamInvitationApi.deleteById(this.invitation.id);
    } catch (_) {
      this.$noty.error('message.team_invitation_deny_failed');
      return;
    } finally {
      this.isDening = false;
    }

    this.$noty.success('message.team_invitation_deny_successful');
    this.$eventBus.$emit('TEAM_INVITATION.DENIED');
  }

}
</script>
