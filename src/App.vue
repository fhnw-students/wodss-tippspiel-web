<template>
  <div id="app">
    <Header/>
    <main class="container">
      <router-view/>
    </main>
    <Footer/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Header from './components/layout/Header.vue';
import Footer from './components/layout/Footer.vue';

@Component({
  components: {
    Header,
    Footer,
  },
})
export default class Home extends Vue {}
</script>
