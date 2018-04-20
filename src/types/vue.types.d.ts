import Vue from 'vue';

import Noty from 'noty';
import { FetchClient } from '../lib/fetch-client';
import { AxiosInstance } from "axios";


declare module 'vue/types/vue' {

  interface VueConstructor {
    $fetchClient: (resource?: string, model?: any) => FetchClient;
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

  interface Vue {
    $createLogger: (channelOrClass: string | any) => ILogger;
    $noty: INoty;
    $http: AxiosInstance;
  }
}
