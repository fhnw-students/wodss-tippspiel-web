<template>
  <section class="admin-page">

    <div class="row page-title">
      <div class="col">
        <h1>{{ $t('admin.title') }}</h1>
        <h2>{{ $t('admin.lead') }}</h2>
      </div>
      <div class="col text-right col-action">

        <div class="dropdown" v-if="!isLoading">

          <SpinnerButton :is-spinning="isLoading" class="btn btn-outline-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {{ selectedGamePhase.name }}
            <i class="fas fa-caret-down"></i>
          </SpinnerButton>

          <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
            <button
              class="dropdown-item"
              type="button"
              v-for="phase in phases"
              :key="phase.id"
              @click="onSelectPhase(phase)">
                {{phase.name}}
            </button>
          </div>
        </div>

        <router-link :to="{ name: 'admin.game.create' }" class="btn btn-outline-success">
          <i class="fas fa-plus"></i>
          {{ $t('admin.create_game') }}
        </router-link>

      </div>
    </div>

    <div class="games">

      <Spinner v-if="isLoading"></Spinner>

      <GameAdminRow v-for="game in gameList" :key="game.id" :game="game" v-if="!isLoading" ></GameAdminRow>

    </div>

  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import * as _ from 'lodash';
import Component from 'vue-class-component';
import { plainToClass } from 'class-transformer';

import GameAdminRow from '@/components/games/GameAdminRow.vue';
import { Game } from '@/models/Game';
import * as gameApi from '@/services/api/game.api';
import * as gamePhaseApi from '@/services/api/gamePhase.api';
import { GamePhase } from '@/models/GamePhase';
import Spinner from '@/components/layout/Spinner.vue';
import SpinnerButton from '@/components/layout/SpinnerButton.vue';

@Component({
  components: {
    GameAdminRow,
    Spinner,
    SpinnerButton,
  },
})
export default class AdminGames extends Vue {

  public games: Game[] = [];
  public phases: GamePhase[] = [];
  public selectedGamePhase: GamePhase = new GamePhase();
  public isLoading: boolean = true;

  public created(): void {
    this.loadContent();
    this.$eventBus.$on('game.deleted', () => this.updateContent());
  }

  public get gameList(): Game[] {
    if (this.selectedGamePhase) {
      return this.games.filter((game) => game.phase.id === this.selectedGamePhase.id);
    }
    return [];
  }

  public onSelectPhase(phase: GamePhase): void {
    this.selectedGamePhase = phase;
  }

  private async loadContent(): Promise<void> {
    this.isLoading = true;
    this.phases = await gamePhaseApi.getAllGamePhases();
    await this.updateContent();
    this.selectedGamePhase = this.games[0].phase;
    this.isLoading = false;
  }

  private async updateContent(): Promise<void> {
    this.games = await gameApi.getAllGames();
  }

}
</script>

