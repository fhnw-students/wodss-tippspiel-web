<template>
  <div class="register-page container">
    <div class="row justify-content-sm-center">
      <form class="col-sm-12 col-md-6" noValidate>

        <h2>{{ $t('register.title') }}</h2>

        <div class="form-group">
          <label for="inputUsername">{{ $t('label.username') }}</label>
          <input
            id="inputUsername"
            class="form-control"
            type="text"
            v-bind:placeholder="$t('placeholder.username')"
            required>
        </div>

        <div class="form-group">
          <label for="inputEmail">{{ $t('label.email') }}</label>
          <input
            id="inputEmail"
            class="form-control"
            type="text"
            v-bind:placeholder="$t('placeholder.email')"
            required>
        </div>

        <div class="form-group">
          <label for="inputPassword">{{ $t('label.password') }}</label>
          <input
            id="inputPassword"
            class="form-control"
            type="password"
            v-bind:placeholder="$t('placeholder.password')"
            required>
        </div>

        <div class="form-group">
          <label for="inputPasswordConfirm">{{ $t('label.password_confirm') }}</label>
          <input
            id="inputPasswordConfirm"
            class="form-control"
            type="password"
            v-bind:placeholder="$t('placeholder.password_confirm')"
            required>
        </div>

        <div>
          <p>TODO: I' am no Robot!</p>
        </div>

        <button
          type="button"
          class="btn btn-lg btn-primary btn-block"
          v-on:click="register()">
          {{ $t("register.submit" )}}
        </button>

      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Register extends Vue {
  public username = '';
  public email = '';
  public password = '';

  private log = this.$createLogger(this);

}
</script>

<style lang="scss">
</style>
