<template>
  <div class="row justify-content-sm-center" v-if="teamInvitations && teamInvitations.length > 0">
    <div class="col">
      <h2>{{$t('teams.invitations')}}</h2>
      <table class="table table-striped">
        <tr>
          <th>{{ $t('teams.invitation_group_name') }}</th>
          <th></th>
        </tr>

        <TeamInvitationRow v-for="invitation in teamInvitations" :key="invitation.id" :invitation="invitation"/>

      </table>
  </div>
</div>
</template>


<script lang="ts">
import { Prop, Component, Vue, Watch } from 'vue-property-decorator';

import { TeamInvitation } from '@/models/TeamInvitation';
import * as userApi from '@/services/api/user.api';
import * as teamApi from '@/services/api/team.api';
import * as teamInvitationApi from '@/services/api/teamInvitation.api';
import TeamInvitationRow from '@/components/teams/TeamInvitationRow.vue';

@Component({
  components: {
    TeamInvitationRow,
  },
})
export default class TeamInvitations extends Vue {

  public teamInvitations: TeamInvitation[] = [];

  public created(): void {
    this.loadContent();

    this.$eventBus.$on('TEAM_INVITATION.ACCEPTED', () => this.loadContent());
    this.$eventBus.$on('TEAM_INVITATION.DENIED', () => this.loadContent());
  }

  public async loadContent(): Promise<void> {
    this.teamInvitations = await userApi.getMyInvitations();
  }

}
</script>
