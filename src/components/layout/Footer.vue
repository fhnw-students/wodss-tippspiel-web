<template>
  <footer class="footer">
    <div class="container">
      <div class="row">
        <div class="col">
          <p>{{ $t('app.title') }} © HeimHirschEli</p>
        </div>
        <div class="col text-right">
          <p>Portal {{guiVersion || '0.0.0'}} - API {{apiVersion || '0.0.0'}}</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Getter } from 'vuex-class';

import { MetaDataGetters } from '@/states/modules/meta';

@Component
export default class Footer extends Vue {

  @Getter(MetaDataGetters.APIVersion)
  public apiVersion: string;

  @Getter(MetaDataGetters.GUIVersion)
  public guiVersion: string;

}
</script>

<style lang="scss">
  footer.footer {
    font-size: .8em;
    background: transparent;
  }
</style>
