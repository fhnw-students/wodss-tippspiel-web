<template>

  <tr>
    <td>
      <router-link
        class="btn btn-link"
        :to="{name: 'team.detail', params: { teamId: team.id.toString() }}">
        {{ team.name }}
      </router-link>
    </td>

    <td class="actions">
      <button
        type="button"
        :disabled="isLoading"
        class="btn btn-danger" v-on:click="leaveTeam(team.id)">
        <span v-if="!isLoading">
          <i class="fas fa-sign-out-alt"></i>
          {{$t('teams.leave_group')}}
        </span>
        <Spinner v-if="isLoading"></Spinner>

      </button>
     </td>

  </tr>
</template>

<script lang="ts">
import { Prop, Component, Vue, Watch } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

import { Team } from '@/models/Team';
import { User } from '@/models/User';
import * as userApi from '@/services/api/user.api';
import * as teamApi from '@/services/api/team.api';
import { UserGetters } from '@/store/modules/user';
import Spinner from '@/components/layout/Spinner.vue';

@Component({
  components: {
  Spinner,
  },
})
export default class MyTeamsRow extends Vue {

  public isLoading: boolean = false;

  @Prop()
  public team: Team;

  public teams: Team[] = [];

  @Getter(UserGetters.GetCurrentUser)
  public currentUser: User;

  // 1. Row 51 -> loadContent() method auslagern
  // 2.

  public async leaveTeam(teamId: number): Promise<void> {
    this.isLoading = true;
    await teamApi.deleteUserFromTeam(teamId, this.currentUser.id);
    this.$eventBus.$emit('USER_DELETED_FROM_TEAM');
    this.isLoading = true;
    this.$noty.success('message.team_leave_successful');
  }
}
</script>

<style lang="scss">
  .actions{
    text-align: right;
  }
}
