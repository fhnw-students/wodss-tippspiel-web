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
      <tr v-for="ranking in rankings" :key="ranking.user.id">
        <th scope="row">{{ ranking.rank }} </th>
        <td>{{ ranking.user.username }}</td>
        <td>{{ ranking.games }}</td>
        <td>{{ ranking.points }}</td>
      </tr>
    </tbody>
  </table>
  <ul class="pagination">
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
        <span class="sr-only">First</span>
      </a>
    </li>
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&lsaquo;</span>
        <span class="sr-only">Previous</span>
      </a>
    </li>
    <li class="page-item"><a class="page-link" :class="firstActiveClass" href="#">{{ firstIndex }}</a></li>
    <li class="page-item"><a class="page-link" :class="secondActiveClass" href="#">{{ secondIndex }}</a></li>
    <li class="page-item"><a class="page-link" :class="thirdActiveClass" href="#">{{ thirdIndex }}</a></li>
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
        <span class="sr-only">Next</span>
      </a>
    </li>
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&rsaquo;</span>
        <span class="sr-only">Last</span>
      </a>
    </li>
  </ul>
</nav>
  </section>
</template>

<script lang="ts">
import { Prop, Component, Vue, Watch } from 'vue-property-decorator';
import { plainToClass } from 'class-transformer';
import { Getter } from 'vuex-class';
import * as _ from 'lodash';

import { UserRanking } from '@/models/UserRanking';
import * as rankingApi from '@/services/api/ranking.api';
import Spinner from '@/components/layout/Spinner.vue';
import SpinnerButton from '@/components/layout/SpinnerButton.vue';

@Component({
  components: {
    Spinner,
    SpinnerButton,
  },
})
export default class UserGames extends Vue {

  public rankings: UserRanking[] = [];
  public isLoading: boolean = true;

  public created(): void {
    this.loadContent();
  }

  private async loadContent(): Promise<void> {
    this.isLoading = true;
    this.rankings = await rankingApi.getUserRanking();
    this.isLoading = false;
  }

}
</script>

<style lang="scss">
  @import '../styles/colors';

</style>
