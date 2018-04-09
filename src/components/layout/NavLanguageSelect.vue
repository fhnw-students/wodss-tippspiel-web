<template>
  <li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      {{ $t(`locale.${$i18n.locale}`) }}
    </a>
    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
      <a
        v-for="locale in locales" :key="locale"
        class="dropdown-item"
        v-on:click="setLocal(locale)">
          {{ $t(`locale.${locale}`) }}
      </a>
    </div>
  </li>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class NavLanguageSelect extends Vue {

  public locales = ['de', 'en'];
  public defaultLocale = 'de';

  public setLocal(locale: string): void {
      this.$i18n.locale = locale;
      localStorage.setItem('locale', locale);
  }

  public created(): void {
    const localeOfCache = localStorage.getItem('locale');
    let locale = this.parseLocaleKey(navigator.language);

    if (localeOfCache) {
      locale = this.parseLocaleKey(localeOfCache);
    }

    this.setLocal(locale);
  }

  private parseLocaleKey(locale: string | null): string {
    try {
      return (locale as string).toLowerCase().split('-')[0];
    } catch (_) {
      return this.defaultLocale;
    }
  }

}
</script>
