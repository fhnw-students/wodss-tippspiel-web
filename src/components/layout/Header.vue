<template>
  <header>
    <nav class="navbar navbar-expand-md fixed-top navbar-dark bg-primary">
      <div class="container">
        <router-link to="/" class="navbar-brand">
          <i class="fas fa-trophy fa-2x"></i>
          <span>{{ $t("app.title") }}</span>
        </router-link>

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
          aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav mr-auto">
            <router-link to="/games" tag="li" class="nav-item" active-class="active">
              <a class="nav-link">{{ $t("games.title") }}</a>
            </router-link>
          </ul>

          <ul class="navbar-nav mt-2 mt-md-0">
            <NavLanguageSelect />
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import NavLanguageSelect from './NavLanguageSelect.vue';

@Component({
  components: {
    NavLanguageSelect,
  },
})
export default class Header extends Vue {}
</script>

