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
        class="btn btn-lg btn-primary btn-block"
        v-on:click="signIn()">
        {{ $t("login.sign_in" )}}
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Action, Getter, State } from 'vuex-class';
import { AuthState, AuthNamespace, AuthGetters, AuthActions } from '../../states/modules/auth';

@Component
export default class Login extends Vue {
  public username = '';
  public password = '';

  @State(AuthNamespace)
  public authState: any;

  @Getter(AuthGetters.IsAuthenticated)
  public isAuthenticated: boolean;

  @Action(AuthActions.SignInUser)
  public signInUser: (cred: any) => void;

  private log = this.$createLogger(this);

  public created(): void {
    this.log.info('created', this.authState);
    this.log.info('signInUser', this.signInUser);
  }

  public signIn(): void {
    this.signInUser({
      username: this.username,
      password: this.password,
    });
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
