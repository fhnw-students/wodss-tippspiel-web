<template>
  <div class="game">

    <GameHeader :game="game"></GameHeader>

    <GameBody :game="game" :readonly="readonly"></GameBody>

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

  @Prop()
  public readonly: boolean;

}
</script>

<style lang="scss">
  @import '../../styles/colors';

  div.game {
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-bottom: 30px;
  }

</style>

