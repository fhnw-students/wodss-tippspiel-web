<template>
  <div class="game-header">
    <div class="game-header-date">{{GameDate}}</div>
    <div class="game-header-time">{{GameTime}}</div>
    <div class="game-header-location">{{game.location.name}}</div>
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
