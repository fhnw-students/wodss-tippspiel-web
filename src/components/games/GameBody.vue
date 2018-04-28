<template>
  <div class="game-body">
    <div class="game-body-host">
      <GameNation :nation="game.host"></GameNation>
    </div>
    <div class="game-body-center">
      <div class="score score-host">
        <input
          autocomplete="off"
          type="text"
          class="form-control form-control-lg"/>
      </div>
      <div class="score score-guest">
        <input
          autocomplete="off"
          type="text"
          class="form-control form-control-lg"/>
      </div>
    </div>
    <div class="game-body-guest">
      <span class="flag-icon flag-icon-es"></span>
      <span class="nation">Schweiz</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator';

import GameNation from '@/components/games/GameNation.vue';
import { Game } from '@/models/Game';

@Component({
  components: {
    GameNation,
  },
})
export default class GameBody extends Vue {

  @Prop()
  public game: Game;

}
</script>
