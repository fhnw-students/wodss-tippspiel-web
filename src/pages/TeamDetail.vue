<template>
  <section class="teamdetail-page">

    <div class="row page-title">
      <div class="col">
        <h1>{{ team.name }}</h1>
      </div>
    </div>

    <TeamUserRanking v-if="hasLoaded" :team-id="team.id" :owner="owner"/>

    <hr class="lined divided" v-if="hasLoaded && currentUserIsOwner">

    <TeamInviteForm v-if="hasLoaded && currentUserIsOwner" :team-id="team.id" />

    <hr class="lined divided" v-if="hasLoaded && currentUserIsOwner">

    <TeamUpdateForm v-if="hasLoaded && currentUserIsOwner" :team="team" />

  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

import * as teamApi from '@/services/api/team.api';
import * as rankingApi from '@/services/api/ranking.api';
import { Team } from '@/models/Team';
import TeamUserRanking from '@/components/ranking/TeamUserRanking.vue';
import TeamInviteForm from '@/components/teams/TeamInviteForm.vue';
import TeamUpdateForm from '@/components/teams/TeamUpdateForm.vue';
import { User } from '@/models/User';
import { UserGetters } from '@/store/modules/user';
import { TeamUser } from '@/models/TeamUser';

@Component({
  components: {
    TeamUserRanking,
    TeamInviteForm,
    TeamUpdateForm,
  },
})
export default class TeamDetail extends Vue {

  @Prop()
  public teamId: string;

  @Getter(UserGetters.GetCurrentUser)
  public currentUser: User;

  public team: Team = new Team();
  public owner: TeamUser = new TeamUser();
  public users: TeamUser[] = [];
  public hasLoaded = false;
  public currentUserIsOwner = false;

  public created(): void {
    this.loadContent();

    this.$eventBus.$on('TEAM_UPDATED', () => this.loadContent());
  }

  public async loadContent(): Promise<void> {
    try {
      this.team = await teamApi.getTeamById(parseInt(this.teamId, 10));
      this.users = await teamApi.getTeamUserById(parseInt(this.teamId, 10));
      this.owner = this.users.filter((user) => user.owner)[0];
      await this.verifyOwner();
      this.hasLoaded = true;
    } catch (_) {
      this.$noty.error('message.load_team_failed');
    }
  }

  public async verifyOwner(): Promise<void> {
    const currentUser = this.users.filter((user) => user.id === this.currentUser.id)[0];
    if (currentUser) {
      this.currentUserIsOwner = currentUser.owner;
    }
  }

}
</script>
