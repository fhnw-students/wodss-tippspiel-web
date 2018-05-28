<template>
  <div class="row">
    <div class="col-xs-12 col-sm-6">
      <h2>{{ $t('ranking.team.title') }}</h2>
    </div>
    <div class="col-xs-12 col-sm-6">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">
            <i class="fas fa-search"></i>
          </span>
        </div>
        <input
          id="inputTeamname"
          name="teamname"
          type="text"
          autocomplete="teamname"
          :aria-label="$t('label.teamname')"
          aria-describedby="basic-addon1"
          :data-vv-as="$t('label.teamname')"
          :class="{'form-control': true, }"
          :placeholder="$t('placeholder.teamname')"
          v-model="teamname">
      </div>
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
          <tr v-for="ranking in rankings" :key="ranking.teamId">
            <th scope="row">{{ ranking.rank }} </th>
            <td>
              <router-link
                class="btn btn-link no-padding"
                :to="{name: 'team.detail', params: { teamId: ranking.teamId.toString() }}">
                {{ ranking.name }}
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

import { TeamRanking as TeamRankingModel } from '@/models/TeamRanking';
import { PagedTeamRanking } from '@/models/PagedTeamRanking';
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
export default class TeamRanking extends Vue {

  public rankings: TeamRankingModel[] = [];
  public isLoading: boolean = true;
  public limit: number = 5;
  public page: number = 0;
  public totalPages: number = 0;
  public teamname: string = '';

  public created(): void {
    this.loadContent(undefined);
  }

  public async loadContent(teamname: string | undefined): Promise<void> {
    try {
      const pagedTeamRanking: PagedTeamRanking = await rankingApi.getTeamRanking(this.teamname, this.page, this.limit);
      this.rankings = pagedTeamRanking.content;
      this.totalPages = pagedTeamRanking.totalPages;
    } catch (_) {
      this.$noty.error('message.load_rankings_failed');
    }
    this.isLoading = false;
  }

  public async onLoadContent(page: number): Promise<void> {
    this.page = page;
    this.loadContent(this.teamname);
  }

  @Watch('teamname')
  public async onTeamnameChanged(newTeamname: string, oldTeamname: string): Promise<void> {
    if (newTeamname !== oldTeamname) {
      this.teamname = newTeamname;
      this.loadContent(newTeamname);
    }
  }

}
</script>
