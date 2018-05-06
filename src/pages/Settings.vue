<template>
  <section class="settings-page">

    <div class="row">
      <div class="col">
        <h1>{{ $t('settings.title') }}</h1>
      </div>
    </div>

    <div class="row">
      <form class="col">

        <div class="form-group row">
          <label for="change-language" class="col-sm-3 col-form-label">{{ $t('settings.change_language') }}</label>
          <div class="col-sm-9">
            <select id="change-language" class="custom-select" v-model="selected">
              <option disabled value="">{{ $t('settings.select_language') }}</option>
              <option v-for="locale in locales" :key="locale" :value="locale">{{ $t(`locale.${locale}`) }}</option>
            </select>
          </div>
        </div>

      </form>
    </div>

  </section>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';

import { Validator } from 'vee-validate';

@Component
export default class Settings extends Vue {

  public locales = ['de', 'en'];
  public defaultLocale = 'de';

  public selected = '';

  public created(): void {
    const localeOfCache = localStorage.getItem('locale');
    let locale = this.parseLocaleKey(navigator.language);

    if (localeOfCache) {
      locale = this.parseLocaleKey(localeOfCache);
    }

    this.selected = locale;
    this.setLocal(locale);
  }

  @Watch('selected')
  public isSelectedChanged(): void {
    this.setLocal(this.selected);
  }

  private setLocal(locale: string): void {
      this.$i18n.locale = locale;
      Validator.localize(locale);
      localStorage.setItem('locale', locale);
      this.$eventBus.$emit('locale.changed', { locale });
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
