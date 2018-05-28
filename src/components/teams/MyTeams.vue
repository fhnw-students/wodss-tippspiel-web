<template>
      <div class="row justify-content-sm-center" >
      <div class="col">
        <h2>{{$t('teams.my_groups')}}</h2>

        <table class="table table-striped" v-if="teams && teams.length > 0">
          <thead>
            <tr>
              <th>{{ $t('teams.group_name') }}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <MyTeamsRow v-for="team in teams" :key="team.id" :team="team"></MyTeamsRow>
          </tbody>
        </table>
        <div v-else class="p-3 mb-2 bg-info text-white">{{$t('teams.no_groups')}}</div>
      </div>
    </div>
</template>

<script lang="ts">
import { Prop, Component, Vue, Watch } from 'vue-property-decorator';

import { Team } from '@/models/Team';
import * as userApi from '@/services/api/user.api';
import * as teamApi from '@/services/api/team.api';
import MyTeamsRow from '@/components/teams/MyTeamsRow.vue';

@Component({
  components: {
    MyTeamsRow,
  },
})
export default class MyTeams extends Vue {

  public teams: Team[] = [];

  public created(): void {
    this.loadContent();

    this.$eventBus.$on('TEAM_INVITATION.ACCEPTED', () => this.loadContent());
    this.$eventBus.$on('USER_DELETED_FROM_TEAM', () => this.loadContent());
  }

  public async loadContent(): Promise<void> {
    this.teams = await userApi.getMyTeams();
  }
}
</script>

<style lang="scss">
  .actions{
    text-align: right;
  }
</style>
