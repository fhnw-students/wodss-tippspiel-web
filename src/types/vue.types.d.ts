import Vue from 'vue';

import Noty from 'noty';
import { AxiosInstance } from "axios";


declare module 'vue/types/vue' {

  interface VueConstructor {
    $createLogger: (channelOrClass: string | any) => ILogger;
    $http: AxiosInstance;
  }

  interface INoty {
    alert: (translationKey: string) => Noty;
    success: (translationKey: string) => Noty;
    warning: (translationKey: string) => Noty;
    error: (translationKey: string) => Noty;
    info: (translationKey: string) => Noty;
  }

  interface IEventBus {
    $on(event: string | string[], callback: Function): this;
    $once(event: string, callback: Function): this;
    $off(event?: string | string[], callback?: Function): this;
    $emit(event: string, ...args: any[]): this;
  }

  interface Vue {
    $createLogger: (channelOrClass: string | any) => ILogger;
    $noty: INoty;
    $eventBus: IEventBus;
    $http: AxiosInstance;
  }
}
