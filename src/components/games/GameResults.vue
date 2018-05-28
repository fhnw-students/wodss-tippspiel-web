<template>
  <div v-if="game.isPlayed">
    <div class="game-results" @mouseenter="showRulePopover()" @mouseleave="hideRulePopover()">

      <div class="game-results-rules">
        <div class="rules">
          <GameRule :active="game.tip && game.tip.tippedHostScoreCorrectly"></GameRule>
          <GameRule :active="game.tip && game.tip.tippedGuestScoreCorrectly"></GameRule>
          <GameRule :active="game.tip && game.tip.tippedWinnerCorrectly"></GameRule>
          <GameRule :active="game.tip && game.tip.tippedBalanceAndWinnerCorrectly"></GameRule>
        </div>
      </div>
      <div class="game-results-score" :class="(game.hasCorrectTip) ? 'hit':''">
        {{ game.host.score }} : {{ game.guest.score }}
      </div>
      <div class="game-results-points">
        <div class="progress-container">
          <div class="progress">
            <div class="progress-bar" role="progressbar" :style="homeStyleObject"></div>
            <div class="progress-bar bg-light" role="progressbar" :style="drawStyleObject" ></div>
            <div class="progress-bar bg-info" role="progressbar" :style="guestStyleObject"></div>
          </div>
        </div>

        <div class="points">
          {{ $t('games.points', { points: (game.tip && game.tip.points) ? game.tip.points : 0 }) }}
        </div>
      </div>
    </div>

    <GameResultsPopover :game="game" v-if="isPopoverVisible"></GameResultsPopover>

  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator';

import { Game } from '@/models/Game';
import GameRule from '@/components/games/GameRule.vue';
import GameResultsPopover from '@/components/games/GameResultsPopover.vue';

interface StyleObject {
  width: string;
}

@Component({
  components: {
    GameRule,
    GameResultsPopover,
  },
})
export default class GameResults extends Vue {

  @Prop()
  public game: Game;

  public isPopoverVisible: boolean = false;

  public get homeStyleObject(): StyleObject {
    return {
      width: `${this.game.hostWinsPercentage}%`,
    };
  }

  public get drawStyleObject(): StyleObject {
    return {
      width: `${this.game.drawPercentage}%`,
    };
  }

  public get guestStyleObject(): StyleObject {
    return {
      width: `${this.game.guestWinsPercentage}%`,
    };
  }

  public showRulePopover(): void {
    this.isPopoverVisible = true;
  }

  public hideRulePopover(): void {
    this.isPopoverVisible = false;
  }

}
</script>

<style lang="scss">
  @import '../../styles/colors';

  div.game-results {
    margin-top: 4px;
    display: flex;
    flex: 1;
    flex-direction: row;
    padding: 0 15px;
    background: $gray-200;

    div.game-results-score {
      width: 120px;
      text-align: center;
      background-color: $yellow;
      font-weight: bold;
      font-size: 1.2em;
      display: flex;
      justify-content: center;
      align-items: center;

      &.hit {
        background-color: $green;
      }
    }

    div.game-results-rules {
      flex: 1;
      font-size: 1.6em;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      div.rules {
        margin-right: 15px;

        svg {
          margin-left: 5px;
        }
      }

      .fa-times-circle {
        color: $red !important;
      }

      .fa-check-circle {
        color: $green !important;
      }
    }
    div.game-results-points {
      flex: 1;
      font-size: 1.2em;
      display: flex;

      div.progress-container {
        display: flex;
        flex: 1;
        justify-content: flex-start;
        align-items: center;
        margin-left: 15px;

        .progress {
          width: 100%;
        }
      }

      div.points {
        display: flex;
        flex: 1;
        justify-content: flex-end;
        align-items: center;
      }
    }

  }

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
