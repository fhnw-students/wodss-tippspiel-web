<template>
  <div v-if="game.isPlayed">
    <div class="game-results" @mouseenter="showRulePopover()" @mouseleave="hideRulePopover()">

      <div class="game-results-rules">
        <div class="rules">
          <GameRule :active="game.tip.tippedHostScoreCorrectly"></GameRule>
          <GameRule :active="game.tip.tippedGuestScoreCorrectly"></GameRule>
          <GameRule :active="game.tip.tippedWinnerCorrectly"></GameRule>
          <GameRule :active="game.tip.tippedBalanceAndWinnerCorrectly"></GameRule>
        </div>
      </div>
      <div class="game-results-score" :class="(game.hasCorrectTip) ? 'hit':''">
        {{ game.host.score }} : {{ game.guest.score }}
      </div>
      <div class="game-results-points">
        {{ $t('games.points', { points: game.tip.points }) }}
      </div>

    </div>

    <div class="game-results-popover" v-if="isPopoverVisible">
      <div class="game-results-popover-inner">
        <p>
          <GameRule :active="game.tip.tippedHostScoreCorrectly"></GameRule>
          <span>{{ $t('games.rules.tipped_host_score_correctly') }}</span>
          <span class="points">{{ $t('games.points', { points: 2 }) }}</span>
          </p>
        <p>
          <GameRule :active="game.tip.tippedGuestScoreCorrectly"></GameRule>
          <span>{{ $t('games.rules.tipped_guest_score_correctly') }}</span>
          <span class="points">{{ $t('games.points', { points: 2 }) }}</span>
          </p>
        <p>
          <GameRule :active="game.tip.tippedWinnerCorrectly"></GameRule>
          <span>{{ $t('games.rules.tipped_winner_correctly') }}</span>
          <span class="points">{{ $t('games.points', { points: 10 }) }}</span>
          </p>
        <p>
          <GameRule :active="game.tip.tippedBalanceAndWinnerCorrectly"></GameRule>
          <span>{{ $t('games.rules.balance_and_winner_correctly') }}</span>
          <span class="points">{{ $t('games.points', { points: 6 }) }}</span>
          </p>
      </div>
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
export default class GameResults extends Vue {

  @Prop()
  public game: Game;

  public isPopoverVisible: boolean = false;

  public showRulePopover(): void {
    this.isPopoverVisible = true;
  }

  public hideRulePopover(): void {
    this.isPopoverVisible = false;
  }

}
</script>
