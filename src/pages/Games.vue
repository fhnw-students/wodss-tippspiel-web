<template>
  <section class="game-page">

    <div class="row">
      <div class="col">
        <h1>{{ $t('games.title') }}</h1>
      </div>
      <div class="col text-right">
        <div class="dropdown" v-if="!isLoading">

          <SpinnerButton :is-spinning="isLoading" class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
      </div>

    </div>

    <div class="games">

      <Spinner v-if="isLoading"></Spinner>

      <GameRow v-if="!isLoading" v-for="game in gameList" :key="game.id" :game="game"></GameRow>

      <div class="row" v-if="!isLoading">
        <div class="col">
          <button class="btn btn-primary btn-block">
            <i class="fas fa-check"></i>
            {{ $t('action.save') }}
          </button>
        </div>
      </div>


    </div>

  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import * as _ from 'lodash';
import Component from 'vue-class-component';
import { plainToClass } from 'class-transformer';

import GameRow from '@/components/games/GameRow.vue';
import { Game } from '@/models/Game';
import * as userApi from '@/services/api/user.api';
import * as gamePhaseApi from '@/services/api/gamePhase.api';
import { GamePhase } from '@/models/GamePhase';
import Spinner from '@/components/layout/Spinner.vue';
import SpinnerButton from '@/components/layout/SpinnerButton.vue';

@Component({
  components: {
    GameRow,
    Spinner,
    SpinnerButton,
  },
})
export default class Games extends Vue {

  public games: Game[] = [];
  public phases: GamePhase[] = [];
  public selectedGamePhase: GamePhase = new GamePhase();
  public isLoading: boolean = true;

  public created(): void {
    this.loadContent();
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
    this.phases = await gamePhaseApi.getGamePhases();
    this.games = await userApi.getMyGames();

    const gamesGroupedByPhases: { [phaseId: string]: Game[] } = _.groupBy(this.games, (game: Game) => game.phase.id);
    for (const phaseId in gamesGroupedByPhases) {
      if (gamesGroupedByPhases[phaseId].some((g) => !g.isPlayed)) {
        this.selectedGamePhase = gamesGroupedByPhases[phaseId][0].phase;
        this.isLoading = false;
        return;
      }
    }
    this.selectedGamePhase = this.games[this.games.length - 1].phase,
    this.isLoading = false;
  }

}
</script>

<style lang="scss">
  @import '../styles/colors';

  div.games {
    display: flex;
    width: 100%;
    flex-direction: column;
  }
</style>
