<template>
  <div>
    <span class="flag-icon flag-icon-ch"></span>
    <span class="nation"></span>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue, Watch } from 'vue-property-decorator';

import { GameNation } from '@/models/GameNation';

@Component
export default class GameBody extends Vue {

  @Prop()
  public gameNation: GameNation;

  @Watch('gameNation')
  public gameNationChanged() {
    console.warn(this.gameNation);
  }

}
</script>
