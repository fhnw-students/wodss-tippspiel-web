<template>
  <div class="col col-sm-6 col-md-6 card">
    <div class="card-body">
      <i class="fas fa-5x" :class="icon"></i>
      <i class="fas fa-3x" :class="typeClass"></i>
      <h3>{{ title }}</h3>
      <p v-html="message"></p>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  props: [
    'title',
    'icon',
    'message',
    'type',
  ],
})
export default class AlertCard extends Vue {
  public type: string;

  public typeList: { [key: string]: string } = {
    success: 'fa-check',
    error: 'fa-times',
    pending: 'fa-clock',
    sending: 'fa-paper-plane',
  };

  public get typeClass(): string {
    return this.typeList[this.type] || 'fa-times';
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/colors";

.fa-check {
  color: $green;
  margin-left: -20px;
}

.fa-times {
  color: $red;
  margin-left: -20px;
}

.fa-clock {
  color: $yellow;
  margin-left: -20px;
}

.fa-paper-plane {
  color: $yellow;
  margin-left: -20px;
}

h3 {
  margin-top: 15px;
}

</style>

