<template>
  <div>
    <slot v-if="hasInternetConnection && isServerAvailable"></slot>

    <main class="container">

      <div class="row justify-content-sm-center">

        <AlertCard
          v-if="!isServerAvailable && hasInternetConnection"
          icon="fa-server"
          :title="$t('connection.server_unavailable.title')"
          :message="$t('connection.server_unavailable.message')" />

        <AlertCard
          v-if="!hasInternetConnection"
          icon="fa-plug"
          :title="$t('connection.offline.title')"
          :message="$t('connection.offline.message')" />

      </div>
    </main>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Action, Getter } from 'vuex-class';

import { MetaDataGetters } from '@/states/modules/meta';
import AlertCard from './layout/AlertCard.vue';

@Component({
  components: {
    AlertCard,
  },
})
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
