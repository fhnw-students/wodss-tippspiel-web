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
  <ul class="pagination">
    <li class="page-item">
      <a class="page-link"
        href="#"
        aria-label="First"
        @click="onLoadFirst()">
        <span aria-hidden="true">&laquo;</span>
        <span class="sr-only">First</span>
      </a>
    </li>
    <li class="page-item">
      <a class="page-link"
        href="#"
        aria-label="Previous"
        @click="onLoadPrevious()">
        <span aria-hidden="true">&lsaquo;</span>
        <span class="sr-only">Previous</span>
      </a>
    </li>
    <li class="page-item">
      <a class="page-link" :class="firstActiveClass" href="#" @click="onClickFirst()">
        {{ firstIndex }}
      </a>
    </li>
    <li class="page-item">
      <a class="page-link" :class="secondActiveClass" href="#" @click="onClickSecond()">
        {{ secondIndex }}
      </a>
    </li>
    <li class="page-item">
      <a class="page-link" :class="thirdActiveClass" href="#" @click="onClickThird()">
        {{ thirdIndex }}
      </a>
    </li>
    <li class="page-item">
      <a class="page-link"
        href="#"
        aria-label="Next"
        @click="onLoadNext()">
        <span aria-hidden="true">&rsaquo;</span>
        <span class="sr-only">Next</span>
      </a>
    </li>
    <li class="page-item">
      <a class="page-link"
        href="#"
        aria-label="Next"
        @click="onLoadLast()">
        <span aria-hidden="true">&raquo;</span>
        <span class="sr-only">Last</span>
      </a>
    </li>
  </ul>
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
  private page: number;
  private numberOfEntries: number;
  private totalPages: number;
  public firstActiveClass: string;
  public secondActiveClass: string;
  public thirdActiveClass: string;
  public firstIndex: number;
  public secondIndex: number;
  public thirdIndex: number;

  constructor() {
    super();
    this.page = 0;
    this.numberOfEntries = 5;
    this.firstActiveClass = ' ';
    this.secondActiveClass = ' ';
    this.thirdActiveClass = ' ';
    this.firstIndex = 1;
    this.secondIndex = 2;
    this.thirdIndex = 3;
  }

  public created(): void {
    this.loadContent();
    this.determineNavigation();
  }

  private async loadContent(): Promise<void> {
    this.isLoading = true;
    try {
      let pagedUserRanking: PagedUserRanking = await rankingApi.getUserRanking(this.page, this.numberOfEntries);
      this.rankings = pagedUserRanking.rankings;
      this.totalPages = pagedUserRanking.totalPages;
    } catch (_) {

    }
    this.isLoading = false;
  }

  private onLoadFirst(): void {
    this.page = 0;
    this.loadContent();
    this.determineNavigation();
  }

  private onLoadPrevious(): void {
    if (this.page > 0) {
      this.page--;
    }
    this.loadContent();
    this.determineNavigation();
  }

  private onLoadNext(): void {
    if (this.page < this.totalPages) {
      this.page++;
    }
    this.loadContent();
    this.determineNavigation();
  }

  private onLoadLast(): void {
    this.page = this.totalPages - 1;
    this.loadContent();
    this.determineNavigation();
  }

  private determineNavigation(): void {
    // indizes are handled off by 1 because this.page is zero based and we don't wanna display a 0th page in the navigation
    console.log("page: " + this.page + " total pages: " + this.totalPages);
    if (this.page === this.totalPages - 1) {
      this.firstIndex = this.page - 1;
      this.secondIndex = this.page;
      this.thirdIndex = this.page + 1;
      this.firstActiveClass = '';
      this.secondActiveClass = '';
      this.thirdActiveClass = 'active';
    } else if (this.page === 0) {
      this.firstIndex = this.page + 1;
      this.secondIndex = this.page + 1 + 1;
      this.thirdIndex = this.page + 1 + 2;
      this.firstActiveClass = 'active';
      this.secondActiveClass = '';
      this.thirdActiveClass = '';
    } else {
      this.firstIndex = this.page;
      this.secondIndex = this.page + 1;
      this.thirdIndex = this.page + 1 + 1;
      this.firstActiveClass = '';
      this.secondActiveClass = 'active';
      this.thirdActiveClass = '';
    }
  }

  public onClickFirst(): void {
    this.page = this.firstIndex - 1;
    this.loadContent();
    this.determineNavigation();
  }

  public onClickSecond(): void {
    this.page = this.secondIndex - 1;
    this.loadContent();
    this.determineNavigation();
  }

  public onClickThird(): void {
    this.page = this.thirdIndex - 1;
    this.loadContent();
    this.determineNavigation();
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
