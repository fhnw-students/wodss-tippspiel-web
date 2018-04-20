<template>
  <section class="login-page">
    <div class="row justify-content-sm-center">
      <div class="col col-sm-6 col-md-6">
        <div class="card">
          <div class="card-body login">
            <form noValidate>

              <h2>{{ $t('login.title') }}</h2>

              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">
                    <i class="fas fa-user"></i>
                  </span>
                </div>
                <input
                  id="inputUsername"
                  name="username"
                  autocomplete="off"
                  type="text"
                  :class="{'form-control form-control-lg': true, 'is-invalid': errors.has('username') }"
                  v-bind:placeholder="$t('label.username')"
                  v-model="username"
                  v-validate="'required'"
                  required />
              </div>

              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">
                    <i class="fas fa-lock"></i>
                  </span>
                </div>
                <input
                  id="inputPassword"
                  name="password"
                  autocomplete="off"
                  type="password"
                  :class="{'form-control form-control-lg': true, 'is-invalid': errors.has('password') }"
                  v-bind:placeholder="$t('label.password')"
                  v-model="password"
                  v-validate="'required'"
                  required />
              </div>

              <spinner-button
                class="btn-primary btn-lg btn-block"
                :is-spinning="isFetching"
                @click.native="signIn()">
                {{ $t("login.sign_in" )}}
              </spinner-button>

            </form>
          </div>
          <div class="card-footer text-muted">
            <div class="links">
              <router-link to="/reset-password">{{ $t('login.reset_password_link') }}</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import SpinnerButton from '../components/layout/SpinnerButton.vue';

import { AuthGetters, AuthActions, Credentials } from '@/store/modules/auth';

@Component({
  components: {
    SpinnerButton,
  },
})
export default class Login extends Vue {
  public username = '';
  public password = '';
  public isSpinning = true;

  @Getter(AuthGetters.IsAuthenticated)
  public isAuthenticated: boolean;

  @Getter(AuthGetters.IsFetching)
  public isFetching: boolean;

  @Getter(AuthGetters.LoginHasFailed)
  public hasFailed: boolean;

  @Action(AuthActions.SignInUser)
  public signInUser: (cred: Credentials) => void;

  private log = this.$createLogger(this);

  public async signIn(): Promise<void> {
    const isValid = await this.$validator.validateAll();
    if (isValid) {
      this.log.info('Try to sign in the user.');
      this.signInUser({
        username: this.username,
        password: this.password,
      });
    } else {
      this.$noty.warning('message.login_incomplete');
    }
  }

  @Watch('isAuthenticated')
  public isAuthenticatedChanged(): void {
    this.stateChanged();
  }

  @Watch('hasFailed')
  public hasFailedChanged(): void {
    this.stateChanged();
  }

  private stateChanged(): void {
    this.log.info('isAuthenticated', this.isAuthenticated);
    this.log.info('hasFailed', this.hasFailed);
    if (this.isAuthenticated) {
      this.log.info('Sign in was successfull. Redirecting to the games page.');
      this.$noty.success('message.login_successful');
      this.$router.push('/games');
    } else {
      if (this.hasFailed) {
        this.$noty.error('message.login_failed');
      }
    }
  }

}
</script>

<style lang="scss">
.login-page {
  h2 {
    margin-bottom: 15px;
  }
}
</style>
