<template>
  <button
    type="button"
    :disabled="isSpinnerVisible"
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

<style lang="scss">
  button > .spinner > div {
    background-color: #FFFFFF !important;
  }

  button::after {
    display: none !important;
  }
</style>
