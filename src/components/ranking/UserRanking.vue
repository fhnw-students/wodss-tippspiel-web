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

              </td>
            <td class="text-right">{{ ranking.games }}</td>
            <td class="text-right">{{ ranking.points }}</td>
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

import { UserRanking as UserRankingModel } from '@/models/UserRanking';
import { PagedUserRanking } from '@/models/PagedUserRanking';
import * as rankingApi from '@/services/api/ranking.api';
import Spinner from '@/components/layout/Spinner.vue';
import Pagination from '@/components/Pagination.vue';
import SpinnerButton from '@/components/layout/SpinnerButton.vue';
import Gravatar from '@/components/layout/Gravatar.vue';

@Component({
  components: {
    Spinner,
    SpinnerButton,
    Pagination,
    Gravatar,
  },
})
export default class UserRanking extends Vue {

  public rankings: UserRankingModel[] = [];
  public isLoading: boolean = true;
  public limit: number = 5;
  public page: number = 0;
  public totalPages: number = 0;

  public created(): void {
    this.loadContent();
  }

  public async loadContent(): Promise<void> {
    try {
      const pagedUserRanking: PagedUserRanking = await rankingApi.getUserRanking(undefined, this.page, this.limit);
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
