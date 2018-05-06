<template>
  <img :src="url" :alt="alt" @load="onLoad" @error="onError" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import md5 from 'md5';

@Component
export default class Gravatar extends Vue {

  @Prop()
  public email: string;

  @Prop()
  public size: number;

  public defaultImg = 'retro';
  public rating = 'g';
  public alt = 'Avatar';

  public get url(): string {
    const email = this.email || '';
    const img = [
      '//www.gravatar.com/avatar/',
      md5(email.trim().toLowerCase()),
      `?s=${this.size || 80}`,
      `&d=${this.defaultImg}`,
      `&r=${this.rating}`,
    ];

    return img.join('');
  }

  public onLoad(...args: any[]): void {
    this.$emit('load', ...args);
  }

  public onError(...args: any[]): void {
    this.$emit('error', ...args);
  }

}
</script>
