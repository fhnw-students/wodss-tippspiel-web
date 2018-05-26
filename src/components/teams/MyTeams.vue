<template>
      <div class="row justify-content-sm-center">
      <div class="col">
        <h2>{{$t('teams.my_groups')}}</h2>

        <table class="table table-striped">
          <tr>
            <th>{{ $t('teams.group_name') }}</th>
            <th></th>
          </tr>

          <tr v-for="team in teams" :key="team.id" >
            <td>
              <router-link :to="{ name: 'teams', params: { teamname: team.name } }" class="btn btn-link">
                {{ team.name }}
              </router-link>
            </td>

            <td class="actions">
              <button
                class="btn btn-danger" v-on:click="leaveTeam(team.id)">
                <i class="fas fa-sign-out-alt"></i>
                {{$t('teams.leave_group')}}
              </button>
            </td>
          </tr>
        </table>
      </div>
    </div>
</template>

<script lang="ts">
import { Prop, Component, Vue, Watch } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

import { Team } from '@/models/Team';
import { User } from '@/models/User';
import * as userApi from '@/services/api/user.api';
import * as teamApi from '@/services/api/team.api';
import { UserGetters } from '@/store/modules/user';

@Component
export default class MyTeams extends Vue {

  public teams: Team[] = [];

  @Getter(UserGetters.GetCurrentUser)
  public currentUser: User;

  public created(): void {
    this.loadContent();
  }

  // 1. Row 51 -> loadContent() method auslagern
  // 2.

  public async leaveTeam(teamId: number): Promise<void> {
    await teamApi.deleteUserFromTeam(teamId, this.currentUser.id);
    await this.loadContent();
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
