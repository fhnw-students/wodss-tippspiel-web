<template>
  <div id="app">
    <ConnectionHandler>
      <Header v-if="isAuthenticated"/>
      <main class="container">
        <router-view/>
      </main>
      <Footer/>
    </ConnectionHandler>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

import { AuthGetters } from '@/store/modules/auth';
import Header from './components/layout/Header.vue';
import Footer from './components/layout/Footer.vue';
import ConnectionHandler from './components/ConnectionHandler.vue';

@Component({
  components: {
    Header,
    Footer,
    ConnectionHandler,
  },
})
export default class Home extends Vue {

  @Getter(AuthGetters.IsAuthenticated)
  public isAuthenticated: boolean;

}
</script>
