<template>
  <div id="app">
    <ConnectionHandler>
      <Header/>
      <main class="container">
        <router-view/>
      </main>
      <Footer/>
    </ConnectionHandler>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

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
export default class Home extends Vue {}
</script>
