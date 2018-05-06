<template>
  <div>
    <span :class="FlagClass"></span>
    <span class="nation d-none d-sm-none d-md-block">{{ gameNation.nation.name }}</span>
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

<style lang="scss">
  span.flag-icon {
    font-size: 2.8em;
  }

  span.nation{
    font-size: 1.4em;
    margin: 0 15px;
  }
</style>

