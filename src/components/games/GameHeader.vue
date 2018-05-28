<template>
  <div class="game-header">
    <div class="game-header-date"><span>{{GameDate}}</span></div>
    <div class="game-header-time"><span>{{GameTime}}</span></div>
    <div class="game-header-location"><span class="d-none d-sm-none d-md-block">{{game.location.name}}</span></div>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator';
import * as moment from 'moment';

import { Game } from '@/models/Game';

@Component
export default class GameHeader extends Vue {

  @Prop()
  public game: Game;

  public get GameDate(): string {
    return moment(this.game.date).format('DD.M');
  }

  public get GameTime(): string {
    return moment(this.game.date).format('HH:mm');
  }

}
</script>

<style lang="scss">
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
</style>
