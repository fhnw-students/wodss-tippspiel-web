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

      <Pagination @load-content="onLoadContent" :total-pages="totalPages" :limit="limit"/>
  </div>
</div>
</template>


<script lang="ts">
import { Prop, Component, Vue, Watch } from 'vue-property-decorator';

import { TeamInvitation } from '@/models/TeamInvitation';
import { PagedTeamInvitation } from '@/models/PagedTeamInvitation';
import * as userApi from '@/services/api/user.api';
import * as teamApi from '@/services/api/team.api';
import * as teamInvitationApi from '@/services/api/teamInvitation.api';
import TeamInvitationRow from '@/components/teams/TeamInvitationRow.vue';
import Pagination from '@/components/Pagination.vue';

@Component({
  components: {
    TeamInvitationRow,
    Pagination,
  },
})
export default class TeamInvitations extends Vue {

  public teamInvitations: TeamInvitation[] = [];
  public isLoading: boolean = true;
  public limit: number = 1;
  public totalPages: number = 0;
  public page: number = 0;

  public created(): void {
    this.loadContent();
    this.$eventBus.$on('TEAM_INVITATION.ACCEPTED', () => this.loadContent());
    this.$eventBus.$on('TEAM_INVITATION.DENIED', () => this.loadContent());
  }

  public async onLoadContent(page: number): Promise<void> {
    this.page = page;
    await this.loadContent();
  }

  public async loadContent(): Promise<void> {
    try {
      const pagedTeamInvitation: PagedTeamInvitation = await userApi.getMyInvitations(this.page, this.limit);
      this.teamInvitations = pagedTeamInvitation.content;
      this.totalPages = pagedTeamInvitation.totalPages;
    } catch (_) {
      this.$noty.error('message.load_team_invitation_failed');
    }
    this.isLoading = false;
  }

}
</script>
