<template>
    <i class="fas" :class="isActive ? 'fa-check-circle': 'fa-times-circle'"></i>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator';

@Component
export default class GameRule extends Vue {

  @Prop()
  public active: boolean;

  public get isActive(): boolean {
    return !!this.active;
  }

}
</script>
