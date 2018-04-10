<template>
  <button
    type="button"
    class="btn">
    <slot v-if="!isSpinnerVisible"></slot>
    <Spinner v-if="isSpinnerVisible"></Spinner>
  </button>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import Spinner from './Spinner.vue';

@Component({
  components: {
    Spinner,
  },
  props: ['isSpinning'],
})
export default class SpinnerButton extends Vue {

  public isSpinning: boolean;

  public get isSpinnerVisible(): boolean {
    return !!this.isSpinning;
  }

}
</script>


<style lang="scss" scoped>

</style>
