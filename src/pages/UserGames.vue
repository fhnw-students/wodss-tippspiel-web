<template>
  <section class="game-page">

    <div class="row">
      <div class="col page-title">
        <h1>{{ $t('games.title') }}</h1>
        <h2>{{ $t('games.sub_title', { username: username }) }}</h2>
      </div>
      <div class="col text-right">
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
      </div>

    </div>

    <div class="games">

      <Spinner v-if="isLoading"></Spinner>

      <GameRow v-if="!isLoading" v-for="game in gameList" :key="game.id" :game="game" :readonly="isReadonly()"></GameRow>

    </div>

  </section>
</template>

<script lang="ts">
import { Prop, Component, Vue, Watch } from 'vue-property-decorator';
import { plainToClass } from 'class-transformer';
import { Getter } from 'vuex-class';
import * as _ from 'lodash';

import { Game } from '@/models/Game';
import { User } from '@/models/User';
import { GamePhase } from '@/models/GamePhase';
import * as gamePhaseApi from '@/services/api/gamePhase.api';
import * as userApi from '@/services/api/user.api';
import { UserGetters } from '@/store/modules/user';
import GameRow from '@/components/games/GameRow.vue';
import Spinner from '@/components/layout/Spinner.vue';
import SpinnerButton from '@/components/layout/SpinnerButton.vue';

@Component({
  components: {
    GameRow,
    Spinner,
    SpinnerButton,
  },
})
export default class UserGames extends Vue {

  @Prop()
  public username: string;

  @Getter(UserGetters.GetCurrentUser)
  public currentUser: User;

  public games: Game[] = [];
  public phases: GamePhase[] = [];
  public selectedGamePhase: GamePhase = new GamePhase();
  public isLoading: boolean = true;

  public created(): void {
    this.loadContent();
  }

  public isReadonly(): boolean {
    if (this.username && this.currentUser && this.currentUser.username) {
      return this.username !== this.currentUser.username;
    }
    return true;
  }

  public get gameList(): Game[] {
    if (this.selectedGamePhase) {
      return this.games.filter((game) => game.phase.id === this.selectedGamePhase.id);
    }
    return [];
  }

  @Watch('username')
  public onUsernameChanged(): void {
    this.loadContent();
  }

  public onSelectPhase(phase: GamePhase): void {
    this.selectedGamePhase = phase;
  }

  private async loadContent(): Promise<void> {
    let username = this.username;
    if (!username) {
      username = this.currentUser.username;
    }

    this.isLoading = true;
    this.phases = await gamePhaseApi.getAllGamePhases();
    this.games = await userApi.getUserGamesByUsername(username);

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
