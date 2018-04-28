<template>
  <div class="game-results">

  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator';

import { Game } from '@/models/Game';

@Component
export default class GameResults extends Vue {

  @Prop()
  public game: Game;

}
</script>
