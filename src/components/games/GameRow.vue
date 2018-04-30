<template>
  <div class="game">

    <GameHeader :game="game"></GameHeader>

    <GameBody :game="game"></GameBody>

    <GameResults :game="game"></GameResults>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

import GameHeader from '@/components/games/GameHeader.vue';
import GameBody from '@/components/games/GameBody.vue';
import GameResults from '@/components/games/GameResults.vue';
import { Game } from '@/models/Game';

@Component({
  components: {
    GameHeader,
    GameBody,
    GameResults,
  },
})
export default class GameRow extends Vue {

  @Prop()
  public game: Game;

}
</script>

<style lang="scss">
  @import '../../styles/colors';

  span.flag-icon {
    font-size: 3em;
  }

  span.nation{
    font-size: 1.6em;
    margin: 0 15px;
  }

  div.game {
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-bottom: 30px;

    div.game-header {
      display: flex;
      flex: 1;
      flex-direction: row;
      padding: 0 15px;

      div.game-header-time {
        width: 120px;
        text-align: center;
      }
      div.game-header-date{
        flex: 1;
        text-align: left;
      }
      div.game-header-location {
        flex: 1;
        text-align: right;
      }

    }

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

    div.game-results {
      margin-top: 4px;
      display: flex;
      flex: 1;
      flex-direction: row;
      padding: 0 15px;
      background: lighten($yellow, 10);

      div.game-results-score {
        width: 120px;
        text-align: center;
        background-color: $orange;
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
        justify-content: flex-end;
        align-items: center;
      }

    }

  }

</style>

