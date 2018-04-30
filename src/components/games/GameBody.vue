<template>
  <div class="game-body">

    <GameNation class="game-body-host" :game-nation="game.host"></GameNation>

    <div class="game-body-center">
      <div class="score score-host">
        <input
          v-model="hostScore"
          autocomplete="off"
          :disabled="game.isPlayed"
          type="text"
          class="form-control form-control-lg"/>
      </div>
      <div class="score score-guest">
        <input
          v-model="guestScore"
          autocomplete="off"
          :disabled="game.isPlayed"
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

  @Watch('game', { deep: true, immediate: true })
  public onGameChanged(): void {
    if (this.game.isTipped) {
      this.hostScore = this.game.tip.hostScore.toString();
      this.guestScore = this.game.tip.guestScore.toString();
    }
  }

}
</script>

<style lang="scss">
  @import '../../styles/colors';

  div.game-body {
    display: flex;
    flex: 1;
    flex-direction: row;

    div.game-body-host {
      text-align: left;
      flex: 1;
      display: flex;
      align-items: center;
      background: $yellow;
      padding-left: 15px;
    }

    div.game-body-center {
      text-align: center;
      width: 120px;
      display: flex;

      div.score {
        flex: 1;
        border: 5px solid darken($yellow, 10);

        input {
          text-align: center;
          padding-left: 5px !important;
          padding-right: 5px !important;
          border: 1px solid darken($yellow, 20);
          border-radius: 0;
          font-weight: bold;
        }

        .form-control:disabled, .form-control[readonly] {
          background: darken($yellow, 10);
          border: 1px solid darken($yellow, 10);
          font-weight: bold;
        }
      }

      div.score-host {
        margin-right: 2px;
      }
      div.score-guest {
        margin-left: 2px;
      }
    }

    div.game-body-guest {
      flex: 1;
      text-align: right;
      display: flex;
      align-items: center;
      flex-direction: row-reverse;
      background: $yellow;
      padding-right: 15px;
    }
  }
</style>
