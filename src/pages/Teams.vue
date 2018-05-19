<template>
  <section class="teams-page">

    <div class="row">
      <div class="col">
        <h1>{{ $t('teams.title') }}</h1>
      </div>
      <div class="col text-right">

      </div>
    </div>

    <div class="row justify-content-sm-center">
      <div class="col">
        <h2>{{$t('teams.invitations')}}</h2>
        <table class="table table-striped">
          <tr>
            <th>{{ $t('teams.invitation_group_name') }}</th>
            <th></th>
          </tr>

          <tr>
            <td>
              Platzhalter für Einladungsteam
            </td>

            <td class="actions">
              <button
                class="btn btn-success">
                <i class="fas fa-check"></i>
                {{$t('teams.invitation_accept')}}
              </button>
              <button
                class="btn btn-danger">
                <i class="fas fa-times"></i>
                {{$t('teams.invitation_deny')}}
              </button>
            </td>

          </tr>
        </table>
      </div>
    </div>

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
  </section>
</template>

<script lang="ts">
import { Prop, Component, Vue, Watch } from 'vue-property-decorator';

import { Team } from '@/models/Team';
import * as userApi from '@/services/api/user.api';

@Component
export default class Teams extends Vue {

  public teams: Team[] = [];

  public created(): void {
    userApi.getMyTeams().then((teams) => this.teams = teams);
  }

}
</script>

<style lang="scss">
  @import '../styles/colors';

  .actions{
    text-align: right;
  }
</style>

