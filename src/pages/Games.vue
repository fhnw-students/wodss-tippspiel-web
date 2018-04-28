<template>
  <section class="game-page">
    <h1>{{ $t('games.title') }}</h1>


    <div class="games">

      <GameRow v-for="game in games" :key="game.id" :game="game"></GameRow>

    </div>

  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import GameRow from '@/components/games/GameRow.vue';
import { Game } from '@/models/Game';
import { plainToClass } from 'class-transformer';

@Component({
  components: {
    GameRow,
  },
})
export default class Games extends Vue {

  public games: Game[] = [];

  public created(): void {
    this.games = [
      plainToClass(Game,  {
        id: 1,
        date: '2018-04-21T16:43:40.551Z',
        phase: {
          id: 1,
          name: 'Phase 1',
        },
        location: {
          id: 1,
          name: 'Moscau',
          utcDiff: -2,
        },
        host: {
          nation: {
            id: 'ESP',
            name: 'Spain',
            tournamentGroup: 'A',
          },
          score: 3,
        },
        guest: {
          nation: {
            id: 'SWE',
            name: 'Sweden',
            tournamentGroup: 'A',
          },
          score: 2,
        },
      }),
    ];
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
