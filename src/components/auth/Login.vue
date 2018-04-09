<template>
  <div class="login">
    <form class="form-signin" noValidate>
      <label htmlFor="inputUsername" class="sr-only">{{ $t('label.username') }}</label>
      <input
        id="inputUsername"
        class="form-control"
        type="text"
        v-bind:placeholder="$t('label.username')"
        v-model="username"
        required />

      <label htmlFor="inputPassword" class="sr-only">{{ $t('label.password') }}</label>
      <input
        id="inputPassword"
        class="form-control"
        type="password"
        v-bind:placeholder="$t('label.password')"
        v-model="password"
        required />

      <button
        type="button"
        class="btn btn-lg btn-primary btn-block"
        v-on:click="signIn()">
        {{ $t("login.sign_in" )}}
      </button>

      <!-- <h3>{{isAuthenticated}}</h3> -->

    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class';
import { AuthState, AuthNamespace, AuthGetters, AuthActions, Credentials } from '@/states/modules/auth';

@Component
export default class Login extends Vue {
  public username = '';
  public password = '';

  @Getter(AuthGetters.IsAuthenticated)
  public isAuthenticated: boolean;

  @Action(AuthActions.SignInUser)
  public signInUser: (cred: Credentials) => void;

  private log = this.$createLogger(this);

  public signIn(): void {
    this.log.info('Try to sign in the user.');
    this.signInUser({
      username: this.username,
      password: this.password,
    });
  }

  @Watch('isAuthenticated')
  private isAuthenticatedChanged(): void {
    if (this.isAuthenticated) {
      this.log.info('Sign in was successfull. Redirecting to /games.');
      this.$router.push('/games');
    }
  }

}
</script>

<style lang="scss">
.form-signin {
  width: 100%;
  margin: 0 auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}

.form-signin .form-control:focus {
  z-index: 2;
}

.form-signin input[type="text"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
