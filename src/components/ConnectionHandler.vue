<template>
  <div>
    <slot v-if="hasInternetConnection && isServerAvailable"></slot>

    <main class="container">

      <div v-if="!isServerAvailable && hasInternetConnection" class="server-unavailable row justify-content-sm-center">
        <div class="col col-sm-6 col-md-6 card">
          <div class="card-body">
            <i class="fas fa-server fa-5x"></i>
            <i class="fas fa-times fa-3x"></i>
            <h3>{{ $t('connection.server_unavailable.title') }}</h3>
            <p>{{ $t('connection.server_unavailable.message') }}</p>
          </div>
        </div>
      </div>

      <div v-if="!hasInternetConnection" class="offline row justify-content-sm-center">
        <div class="col col-sm-6 col-md-6 card">
          <div class="card-body">
            <i class="fas fa-plug fa-5x"></i>
            <i class="fas fa-times fa-3x"></i>
            <h3>{{ $t('connection.offline.title') }}</h3>
            <p>{{ $t('connection.offline.message') }}</p>
          </div>
        </div>
      </div>

    </main>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Action, Getter } from 'vuex-class';

import { MetaDataGetters } from '@/states/modules/meta';

@Component
export default class ConnectionHandler extends Vue {

  public static EVENTS = ['online', 'offline', 'load'];

  public hasInternetConnection = true;

  @Getter(MetaDataGetters.IsServerAvailable)
  public isServerAvailable: boolean;

  public mounted(): void {
    ConnectionHandler.EVENTS.forEach((event) => window.addEventListener(event, this.updateOnlineStatus));
  }

  public beforeDestroy(): void {
    ConnectionHandler.EVENTS.forEach((event) => window.removeEventListener(event, this.updateOnlineStatus));
  }

  public updateOnlineStatus(): void {
    this.hasInternetConnection = navigator.onLine || false;
  }

}
</script>

<style scoped lang="scss">
@import "../styles/colors";

div.server-unavailable, div.offline {
  .fa-times{
    color: $red;
    margin-left: -20px;
  }
  h3{
    margin-top: 15px;
  }
}
</style>
