<template>
  <section class="ranking-page">

   <div class="row page-title">
      <div class="col">
        <h1>{{ $t('ranking.title') }}</h1>
      </div>
   </div>
  <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">{{ $t('ranking.table.header.name') }}</th>
        <th scope="col">{{ $t('ranking.table.header.games') }}</th>
        <th scope="col">{{ $t('ranking.table.header.score') }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="ranking in rankings" :key="ranking.userId">
        <th scope="row">{{ ranking.rank }} </th>
        <td>{{ ranking.username }}</td>
        <td>{{ ranking.games }}</td>
        <td>{{ ranking.points }}</td>
      </tr>
    </tbody>
  </table>
  <Pagination @load-content="loadContent" :total-pages="totalPages"></Pagination>
  </section>
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

@Component({
  components: {
    Spinner,
    SpinnerButton,
    Pagination,
  },
})
export default class Ranking extends Vue {

  public rankings: UserRanking[] = [];
  public isLoading: boolean = true;
  private numberOfEntries: number;
  public totalPages: number = 0;

  constructor() {
    super();
    this.numberOfEntries = 5;
  }

  public created(): void {
    this.loadContent(0);
  }

  private async loadContent(offset: number): Promise<void> {
    this.isLoading = true;
    try {
      const pagedUserRanking: PagedUserRanking = await rankingApi.getUserRanking(offset, this.numberOfEntries);
      this.rankings = pagedUserRanking.rankings;
      this.totalPages = pagedUserRanking.totalPages;
    } catch (_) {
      this.$noty.error('message.load_rankings_failed');
    }
    this.isLoading = false;
  }

}
</script>

<style lang="scss">
  @import '../styles/colors';
  .active {
    background-color: rgb(74, 170, 218);
    color: rgb(222, 226, 230);
  }

  .pagination {
    margin-left: 40%;
  }
</style>
