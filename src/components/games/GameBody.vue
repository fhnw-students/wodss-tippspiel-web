<template>
  <div class="game-body">

    <GameNation class="game-body-host" :game-nation="game.host"></GameNation>

    <div class="game-body-center">
      <div class="score score-host">
        <input
          v-model="hostScore"
          autocomplete="off"
          type="text"
          class="form-control form-control-lg"/>
      </div>
      <div class="score score-guest">
        <input
          v-model="guestScore"
          autocomplete="off"
          type="text"
          class="form-control form-control-lg"/>
      </div>
    </div>

    <GameNation class="game-body-guest" :game-nation="game.guest"></GameNation>

  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue, Watch } from 'vue-property-decorator';

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

  public hostScore: string = '';
  public guestScore: string = '';

}
</script>
