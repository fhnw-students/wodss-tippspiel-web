<template>
  <div>
    <span :class="FlagClass"></span>
    <span class="nation">{{ gameNation.nation.name }}</span>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue, Watch } from 'vue-property-decorator';

import { GameNation } from '@/models/GameNation';

@Component
export default class GameBody extends Vue {

  @Prop()
  public gameNation: GameNation;

  public get FlagClass(): string {
    return `flag-icon flag-icon-${this.gameNation.nation.code}`;
  }

}
</script>
