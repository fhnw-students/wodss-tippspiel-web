<template>
  <div class="game-results-popover">
    <div class="game-results-popover-inner">
      <p>
        <GameRule :active="game.tip.tippedHostScoreCorrectly"></GameRule>
        <span>{{ $t('games.rules.tipped_host_score_correctly') }}</span>
        <span class="points" :class="game.tip.tippedHostScoreCorrectly ? '': 'text-cross'">{{ $t('games.points', { points: 2 }) }}</span>
      </p>
      <p>
        <GameRule :active="game.tip.tippedGuestScoreCorrectly"></GameRule>
        <span>{{ $t('games.rules.tipped_guest_score_correctly') }}</span>
        <span class="points" :class="game.tip.tippedGuestScoreCorrectly ? '': 'text-cross'">{{ $t('games.points', { points: 2 }) }}</span>
      </p>
      <p>
        <GameRule :active="game.tip.tippedWinnerCorrectly"></GameRule>
        <span>{{ $t('games.rules.tipped_winner_correctly') }}</span>
        <span class="points" :class="game.tip.tippedWinnerCorrectly ? '': 'text-cross'">{{ $t('games.points', { points: 10 }) }}</span>
      </p>
      <p>
        <GameRule :active="game.tip.tippedBalanceAndWinnerCorrectly"></GameRule>
        <span>{{ $t('games.rules.balance_and_winner_correctly') }}</span>
        <span class="points" :class="game.tip.tippedBalanceAndWinnerCorrectly ? '': 'text-cross'">{{ $t('games.points', { points: 6 }) }}</span>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator';

import { Game } from '@/models/Game';
import GameRule from '@/components/games/GameRule.vue';

@Component({
  components: {
    GameRule,
  },
})
export default class GameResultsPopover extends Vue {

  @Prop()
  public game: Game;

}
</script>

<style lang="scss">
  @import '../../styles/colors';

  .game-results-popover {
    position: absolute;
    margin-top: 4px;
    width: 100%;
    left: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    .game-results-popover-inner {
      width: 420px;

      background: lighten($yellow, 10);
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      padding-bottom: 4px;

      p {
        margin: 0;
        padding-top: 4px;
        padding-left: 15px;
        padding-right: 15px;

        display: flex;
        justify-content: flex-start;
        align-items: center;

        .fa-times-circle {
          color: $red !important;
        }

        .fa-check-circle {
          color: $green !important;
        }

        svg {
          margin-right: 4px;
        }

        span {
          flex: 2;
        }

        .points {
          flex: 1;
          display: block;
          align-self: flex-end;
          font-weight: bold;
          text-align: right;
        }
      }
    }
  }
</style>
