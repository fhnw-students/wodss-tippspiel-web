<template>
  <div class="row">
    <div class="col-xl-12">
      <h2>{{ $t('ranking.user.title') }}</h2>
    </div>
    <div class="col-xl-12">
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">{{ $t('ranking.table.header.name') }}</th>
            <th scope="col" class="text-right">{{ $t('ranking.table.header.games') }}</th>
            <th scope="col" class="text-right">{{ $t('ranking.table.header.score') }}</th>
            <th scope="col" class="text-right" v-if="isOwner"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ranking in rankings" :key="ranking.userId">
            <th scope="row">{{ ranking.rank }} </th>
            <td>
              <Gravatar class="avatar" :email="ranking.email" :size="25" />
              <router-link
                class="btn btn-link no-padding"
                :to="{name: 'user.games', params: { username: ranking.username }}">
                {{ ranking.username }}
              </router-link>
              <i class="fas fa-user-secret owner-icon" v-if="owner.id === ranking.userId"></i>
            </td>
            <td class="text-right">{{ ranking.games }}</td>
            <td class="text-right">{{ ranking.points }}</td>
            <td class="text-right" style="padding: 6px;" v-if="isOwner">
              <DeleteTeamUser :teamId="teamId" :userId="ranking.userId" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="col-xl-12">
      <Pagination @load-content="onLoadContent" :total-pages="totalPages" :limit="limit"></Pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue, Watch } from 'vue-property-decorator';
import { plainToClass } from 'class-transformer';
import { Getter } from 'vuex-class';
import * as _ from 'lodash';

import { UserRanking } from '@/models/UserRanking';
import { PagedUserRanking } from '@/models/PagedUserRanking';
import * as rankingApi from '@/services/api/ranking.api';
import Spinner from '@/components/layout/Spinner.vue';
import Pagination from '@/components/Pagination.vue';
import SpinnerButton from '@/components/layout/SpinnerButton.vue';
import Gravatar from '@/components/layout/Gravatar.vue';
import DeleteTeamUser from '@/components/teams/DeleteTeamUser.vue';
import { TeamUser } from '@/models/TeamUser';
import { User } from '@/models/User';
import { UserGetters } from '@/store/modules/user';

@Component({
  components: {
    Spinner,
    SpinnerButton,
    Pagination,
    Gravatar,
    DeleteTeamUser,
  },
})
export default class TeamUserRanking extends Vue {

  @Prop()
  public teamId: number;

  @Prop()
  public owner: TeamUser;

  @Getter(UserGetters.GetCurrentUser)
  public currentUser: User;

  public rankings: UserRanking[] = [];
  public isLoading: boolean = true;
  public limit: number = 5;
  public page: number = 0;
  public totalPages: number = 0;

  public created(): void {
    this.loadContent();

    this.$eventBus.$on('TEAM_USER_REMOVED', () => this.loadContent());
  }

  public get isOwner(): boolean {
    return this.owner.id === this.currentUser.id;
  }

  public async loadContent(): Promise<void> {
    try {
      const pagedUserRanking: PagedUserRanking = await rankingApi.getTeamUserRanking(this.teamId, this.page, this.limit);
      this.rankings = pagedUserRanking.content;
      this.totalPages = pagedUserRanking.totalPages;
    } catch (_) {
      this.$noty.error('message.load_rankings_failed');
    }
    this.isLoading = false;
  }

  public async onLoadContent(page: number): Promise<void> {
    this.page = page;
    this.loadContent();
  }

}
</script>

<style lang="scss" scoped>
  @import '../../styles/colors';

  .owner-icon {
    color: $dark;
    margin-left: 5px;
    vertical-align: middle;
  }

</style>
