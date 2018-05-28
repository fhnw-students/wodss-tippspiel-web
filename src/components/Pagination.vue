<template>

  <ul class="pagination" v-if="totalPages > 1">
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
    <li class="page-item" v-if="isValidIndex(firstIndex)">
      <a class="page-link" :class="firstActiveClass" href="#" @click="onClickFirst()">
        {{ firstIndex }}
      </a>
    </li>
    <li class="page-item" v-if="isValidIndex(secondIndex)">
      <a class="page-link" :class="secondActiveClass" href="#" @click="onClickSecond()">
        {{ secondIndex }}
      </a>
    </li>
    <li class="page-item" v-if="isValidIndex(thirdIndex)">
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
export default class Pagination extends Vue {

  @Prop()
  public totalPages: number;

  @Prop()
  public limit: number;

  public page: number = 0;
  public firstActiveClass: string = '';
  public secondActiveClass: string = '';
  public thirdActiveClass: string = '';
  public firstIndex: number = 1;
  public secondIndex: number = 2;
  public thirdIndex: number = 3;

  public created(): void {
    this.determineNavigation();
  }

  public isValidIndex(index: number): boolean {
    return index > 0 && index <= this.totalPages;
  }

  private onLoadFirst(): void {
    this.page = 0;
    this.$emit('load-content', this.page);
    this.determineNavigation();
  }

  private onLoadPrevious(): void {
    if (this.page > 0) {
      this.page--;
    }
    this.$emit('load-content', this.page);
    this.determineNavigation();
  }

  private onLoadNext(): void {
    if (this.page < this.totalPages - 1) {
      this.page++;
    }
    this.$emit('load-content', this.page);
    this.determineNavigation();
  }

  private onLoadLast(): void {
    this.page = this.totalPages - 1;
    this.$emit('load-content', this.page);
    this.determineNavigation();
  }

  private determineNavigation(): void {
    // indizes are handled off by 1 because this.page is zero based and we don't wanna display a 0th page in the navigation
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
    this.$emit('load-content', this.page);
    this.determineNavigation();
  }

  public onClickSecond(): void {
    this.page = this.secondIndex - 1;
    this.$emit('load-content', this.page);
    this.determineNavigation();
  }

  public onClickThird(): void {
    this.page = this.thirdIndex - 1;
    this.$emit('load-content', this.page);
    this.determineNavigation();
  }
}
</script>

<style lang="scss" scoped>
  @import '../styles/colors';

  .pagination {
    margin-left: 40%;

    .active {
      background-color: $blue;
      color: $white;
    }
  }
</style>
