<template>
  <div class="game-results" v-if="game.isPlayed">

    <div class="game-results-rules">
      <div class="rules">
        <i class="fas fa-check-circle"></i>
        <i class="fas fa-times-circle"></i>
        <i class="fas fa-times-circle"></i>
        <i class="fas fa-times-circle"></i>
      </div>
    </div>
    <div class="game-results-score" :class="(game.hasCorrectTip) ? 'hit':''">
      {{ game.host.score }} : {{ game.guest.score }}
    </div>
    <div class="game-results-points">
      20 Points
    </div>

  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator';

import { Game } from '@/models/Game';

@Component
export default class GameResults extends Vue {

  @Prop()
  public game: Game;

}
</script>
