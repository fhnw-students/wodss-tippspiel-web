<template>
  <section class="login-page">
    <div class="row justify-content-sm-center">
      <div class="col col-sm-6 col-md-6 card">
        <div class="card-body login">
          <form class="form-signin" noValidate>

            <h2>{{ $t('login.title') }}</h2>

            <label htmlFor="inputUsername" class="sr-only">{{ $t('label.username') }}</label>
            <input
              id="inputUsername"
              name="username"
              type="text"
               :class="{'form-control': true, 'is-invalid': errors.has('username') }"
              v-bind:placeholder="$t('label.username')"
              v-model="username"
              v-validate="'required'"
              required />

            <label htmlFor="inputPassword" class="sr-only">{{ $t('label.password') }}</label>
            <input
              id="inputPassword"
              name="password"
              type="password"
              :class="{'form-control': true, 'is-invalid': errors.has('password') }"
              v-bind:placeholder="$t('label.password')"
              v-model="password"
              v-validate="'required'"
              required />

            <spinner-button
              class="btn-lg btn-primary btn-block"
              :is-spinning="isFetching"
              @click.native="signIn()">
              {{ $t("login.sign_in" )}}
            </spinner-button>

          </form>
          <div class=" links">
              <router-link to="reset">{{ $t('login.reset_password_link') }}</router-link>
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

import { AuthState, AuthNamespace, AuthGetters, AuthActions, Credentials } from '@/states/modules/auth';

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

  @Getter(AuthGetters.HasFailed)
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
  private isAuthenticatedChanged(): void {
    if (this.isAuthenticated) {
      this.log.info('Sign in was successfull. Redirecting to the games page.');
      this.$noty.success('message.login_successful');
      this.$router.push('/');
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
  .links {
    margin-top: 15px;
  }
}


.form-signin {
  width: 100%;
  margin: 0 auto;

  .checkbox {
    font-weight: 400;
  }

  .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
  }

  .form-control:focus {
    z-index: 2;
  }

  input[type="text"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }

  input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
}

</style>
