<template>
  <div class="game-body">

    <GameNation class="game-body-host" :game-nation="game.host"></GameNation>

    <div class="game-body-center">
      <div class="score score-host" :class="hostScoreIsInvalid ? 'is-invalid' : ''">
        <input
          v-model="hostScore"
          autocomplete="off"
          :disabled="!game.isOpenToTip || game.isPlayed || isUpdating || readonly === true"
          @keypress="onKeyPress($event, hostScore)"
          @blur.prevent="onHostScoreChanged()"
          type="text"
          class="form-control form-control-lg"/>
      </div>
      <div class="score score-guest" :class="guestScoreIsInvalid ? 'is-invalid' : ''">
        <input
          v-model="guestScore"
          autocomplete="off"
          :disabled="!game.isOpenToTip || game.isPlayed || isUpdating || readonly === true"
          @keypress="onKeyPress($event, guestScore)"
          @blur.prevent="onGuestScoreChanged()"
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
import * as gameApi from '@/services/api/game.api';
import { Score } from '@/models/Score';

@Component({
  components: {
    GameNation,
  },
})
export default class GameBody extends Vue {

  @Prop()
  public game: Game;

  @Prop()
  public readonly: boolean;

  public hostScore: string = '';
  public guestScore: string = '';

  public hostScoreIsInvalid: boolean = false;
  public guestScoreIsInvalid: boolean = false;

  public isDirty: boolean = false;
  public isUpdating: boolean = false;

  @Watch('game', { deep: true, immediate: true })
  public onGameChanged(): void {
    if (this.game.isTipped) {
      this.hostScore = this.game.tip.hostScore.toString();
      this.guestScore = this.game.tip.guestScore.toString();
    }
  }

  public onKeyPress(event: { key: string }, score: string): void {
    if (!Number.isInteger(parseInt(event.key, 10)) || score.length > 1) {
      (event as any).preventDefault();
    }
  }

  public onHostScoreChanged(): void {
    if (this.hostScore !== this.getHostScoreTipScore()) {
      this.isDirty = true;
    }

    if (this.isDirty && this.hostScore === '') {
      this.hostScoreIsInvalid = true;
    } else {
      this.hostScoreIsInvalid = false;
    }

    this.verifyAndUpdate();
  }

  public onGuestScoreChanged(): void {
    if (this.guestScore !== this.getGuestScoreTipScore()) {
      this.isDirty = true;
    }

    if (this.isDirty && this.guestScore === '') {
      this.guestScoreIsInvalid = true;
    } else {
      this.guestScoreIsInvalid = false;
    }

    this.verifyAndUpdate();
  }

  private getHostScoreTipScore(): string {
    if ( this.game.tip && this.game.tip.hostScore ) {
      return this.game.tip.hostScore.toString();
    }
    return '';
  }

  private getGuestScoreTipScore(): string {
    if ( this.game.tip && this.game.tip.guestScore ) {
      return this.game.tip.guestScore.toString();
    }
    return '';
  }

  private async verifyAndUpdate(): Promise<void> {
    if (this.isDirty && this.hostScore !== '' && this.guestScore !== '') {
      this.isUpdating = true;
      this.game.tip = await gameApi.updateTip(this.game.id, new Score(parseInt(this.hostScore, 10), parseInt(this.guestScore, 10)));
      this.isDirty = false;
      this.guestScoreIsInvalid = false;
      this.hostScoreIsInvalid = false;
      this.isUpdating = false;
    } else {
      if (this.isDirty) {
        this.hostScoreIsInvalid = this.hostScore === '' && this.guestScore !== '';
        this.guestScoreIsInvalid = this.guestScore === '' && this.hostScore !== '';
      }
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
      background: $gray-200;
      padding-left: 15px;
    }

    div.game-body-center {
      text-align: center;
      width: 120px;
      display: flex;

      div.score {
        flex: 1;
        border: 5px solid darken($gray-200, 10);
        background: darken($gray-200, 10);

        input {
          text-align: center;
          padding-left: 5px !important;
          padding-right: 5px !important;
          border: 1px solid darken($gray-200, 20);
          border-radius: 0;
          font-weight: bold;
        }

        .form-control:disabled, .form-control[readonly] {
          background: darken($gray-200, 10);
          border: 1px solid darken($gray-200, 10);
          font-weight: bold;
        }

        &.is-invalid{
          border: 5px solid $red;
          background: $red;

          input {
            border: 1px solid darken($red, 10);
          }
        }

        &.is-valid{
          border: 5px solid $green;

          input {
            border: 1px solid darken($green, 10);
          }
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
      background: $gray-200;
      padding-right: 15px;
    }
  }
</style>
