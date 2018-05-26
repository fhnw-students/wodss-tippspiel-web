<template>
      <div class="row justify-content-sm-center">
      <div class="col">
        <h2>{{$t('teams.my_groups')}}</h2>

        <table class="table table-striped">
          <tr>
            <th>{{ $t('teams.group_name') }}</th>
            <th>{{ $t('teams.group_points') }}</th>
            <th></th>
          </tr>

          <tr v-for="team in teams" :key="team.id" >
            <td>
              <router-link :to="{ name: 'teams', params: { teamname: team.name } }" class="btn btn-link">
                {{ team.name }}
              </router-link>
            </td>

            <td>
               {{ team.averagePoints }}
            </td>

            <td class="actions">
              <button
                class="btn btn-danger">
                <i class="fas fa-sign-out-alt"></i>
                {{$t('teams.leave_group')}}
              </button>
              <button
                class="btn btn-primary">
                <i class="fas fa-info"></i>
                {{$t('teams.group_details')}}
              </button>
            </td>
          </tr>
        </table>
      </div>
    </div>
</template>

<script lang="ts">
import { Prop, Component, Vue, Watch } from 'vue-property-decorator';

import { Team } from '@/models/Team';
import * as userApi from '@/services/api/user.api';

@Component
export default class MyTeams extends Vue {

  public teams: Team[] = [];

  public created(): void {
    userApi.getMyTeams().then((teams) => this.teams = teams);
  }

}
</script>

<style lang="scss">
  .actions{
    text-align: right;
  }
</style>
