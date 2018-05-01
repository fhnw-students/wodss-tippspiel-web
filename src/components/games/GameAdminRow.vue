<template>
  <div class="game">
    <div class="game-body-admin">

      <GameNation class="game-body-host" :game-nation="game.host"></GameNation>

      <div class="game-body-center">
        <div class="score score-host" :class="hostScoreIsInvalid ? 'is-invalid' : ''">
          <input
            v-model="hostScore"
            autocomplete="off"
            @keypress="onKeyPress"
            type="text"
            class="form-control form-control-lg"/>
        </div>
        <div class="score score-guest" :class="guestScoreIsInvalid ? 'is-invalid' : ''">
          <input
            v-model="guestScore"
            autocomplete="off"
            @keypress="onKeyPress"
            type="text"
            class="form-control form-control-lg"/>
        </div>
      </div>

      <GameNation class="game-body-guest" :game-nation="game.guest"></GameNation>

      <div class="game-body-action">
          <button
            type="button"
            :disabled="isUpdating"
            @click="saveResult"
            class="btn btn-success">
            <span v-if="!isUpdating">
              <i class="fas fa-check"></i>
            </span>
            <Spinner v-if="isUpdating"></Spinner>
          </button>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue, Watch } from 'vue-property-decorator';

import GameNation from '@/components/games/GameNation.vue';
import Spinner from '@/components/layout/Spinner.vue';
import { Game } from '@/models/Game';
import * as gameApi from '@/services/api/game.api';
import { Score } from '@/models/Score';
import { setTimeout } from 'timers';

@Component({
  components: {
    GameNation,
    Spinner,
  },
})
export default class GameAdminRow extends Vue {

  @Prop()
  public game: Game;

  @Prop()
  public admin: boolean;

  public hostScore: string = '';
  public guestScore: string = '';

  public hostScoreIsInvalid: boolean = false;
  public guestScoreIsInvalid: boolean = false;

  public isUpdating: boolean = false;

  @Watch('game', { deep: true, immediate: true })
  public onGameChanged(): void {
    this.hostScore = (this.game.host.score !== null) ? this.game.host.score.toString() : '';
    this.guestScore = (this.game.guest.score !== null) ? this.game.guest.score.toString() : '';
  }

  public onKeyPress(event: { key: string }, a: any): void {
    if (!parseInt(event.key, 10)) {
      (event as any).preventDefault();
    }
  }

  private async saveResult(): Promise<void> {
    if (this.hostScore !== '' && this.guestScore !== '') {
      this.isUpdating = true;
      await gameApi.updateGame(this.game.id, new Score(parseInt(this.hostScore, 10), parseInt(this.guestScore, 10)));
      this.guestScoreIsInvalid = false;
      this.hostScoreIsInvalid = false;
      this.isUpdating = false;
      this.$noty.success('message.game_updated_successful');
    } else {
      this.setInvalid();
    }
  }

  private setInvalid(): void {
    this.hostScoreIsInvalid = this.hostScore === '';
    this.guestScoreIsInvalid = this.guestScore === '';
  }

}
</script>

<style lang="scss">
  @import '../../styles/colors';

  div.game {
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-bottom: 30px;

    div.game-body-admin {
      display: flex;
      flex: 1;
      flex-direction: row;

      div.game-body-action {
        display: flex;
        width: 100px;

        button {
          width: 100%;
          height: 100%;
          border-radius: 0;
        }
      }

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
          background: darken($yellow, 10);

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
        background: $yellow;
        padding-right: 15px;
      }
    }
  }
</style>
