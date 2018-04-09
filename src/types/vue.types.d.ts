import Vue from 'vue';

declare module 'vue/types/vue' {
  interface Vue {
    $createLogger: (channelOrClass: string | any) => ILogger;
  }
}
