<template>
  <section class="register-page">
    <div class="row justify-content-sm-center">

      <div v-if="!isRegistered" class="col-sm-12 col-md-6">
        <div class="card">
          <form class="card-body" noValidate>

            <h2>{{ $t('register.title') }}</h2>

            <Gravatar :email="email" />

            <div class="form-group">
              <label for="inputUsername">{{ $t('label.username') }}</label>
              <input
                id="inputUsername"
                name="username"
                type="text"
                autocomplete="username"
                :data-vv-as="$t('label.username')"
                :class="{'form-control': true, 'is-invalid': errors.has('username') }"
                :placeholder="$t('placeholder.username')"
                v-validate="'required|min:3'"
                v-model="username"
                required>
                <div v-show="errors.has('username')" class="invalid-feedback">
                  {{ errors.first('username') }}
                </div>
            </div>

            <div class="form-group">
              <label for="inputEmail">{{ $t('label.email') }}</label>
              <input
                id="inputEmail"
                name="email"
                type="email"
                autocomplete="email"
                :data-vv-as="$t('label.email')"
                :class="{'form-control': true, 'is-invalid': errors.has('email') }"
                :placeholder="$t('placeholder.email')"
                v-validate="'required|email'"
                v-model="email"
                required>
                <div v-show="errors.has('email')" class="invalid-feedback">
                  {{ errors.first('email') }}
                </div>
            </div>

            <div class="form-group">
              <label for="inputPassword">{{ $t('label.password') }}</label>
              <input
                id="inputPassword"
                name="password"
                type="password"
                autocomplete="off"
                :data-vv-as="$t('label.password')"
                :class="{'form-control': true, 'is-invalid': errors.has('password') }"
                :placeholder="$t('placeholder.password')"
                v-validate="'required|min:4'"
                v-model="password"
                required>
                <div v-show="errors.has('password')" class="invalid-feedback">
                  {{ errors.first('password') }}
                </div>
            </div>

            <div class="form-group">
              <label for="inputPasswordConfirm">{{ $t('label.password_confirm') }}</label>
              <input
                id="inputPasswordConfirm"
                name="passwordConfirm"
                type="password"
                autocomplete="off"
                :data-vv-as="$t('label.password_confirm')"
                :class="{'form-control': true, 'is-invalid': errors.has('passwordConfirm') }"
                :placeholder="$t('placeholder.password_confirm')"
                v-validate="'required|confirmed:password'"
                v-model="passwordConfirm"
                required>
                <div v-show="errors.has('passwordConfirm')" class="invalid-feedback">
                  {{ errors.first('passwordConfirm') }}
                </div>
            </div>

            <div>
              <VueRecaptcha
                ref="recaptcha"
                sitekey="6LcRXlMUAAAAAK2eHmFMSMgzUHsq7mrZgDaQzuXz"
                @verify="onCaptchaVerified"
                @expired="onCaptchaExpired"
              ></VueRecaptcha>
            </div>

            <spinner-button
              class="btn btn-primary btn-lg btn-block"
              :is-spinning="isFetching"
              :disabled="!isVerified"
              @click.native="onClickRegister()">
              {{ $t("register.submit" )}}
            </spinner-button>

          </form>
          <div class="card-footer text-muted">
            <div class="links">
              <router-link to="/auth/login">
                {{ $t('login.sign_in') }}
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <AlertCard
        v-if="isRegistered"
        :icon="'fa-envelope'"
        :type="'sending'"
        :title="$t('verification.pending.title')"
        :message="$t('verification.pending.message')">
      </AlertCard>

    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { Watch } from 'vue-property-decorator';
import VueRecaptcha from 'vue-recaptcha';
import Component from 'vue-class-component';

import Gravatar from '@/components/layout/Gravatar.vue';
import AlertCard from '@/components/layout/AlertCard.vue';
import SpinnerButton from '@/components/layout/SpinnerButton.vue';
import { registerUser } from '@/services/api/auth.api';

@Component({
  components: {
    Gravatar,
    AlertCard,
    VueRecaptcha,
    SpinnerButton,
  },
})
export default class Register extends Vue {
  public username = '';
  public email = '';
  public password = '';
  public passwordConfirm = '';

  public isVerified: boolean = false;
  public isRegistered: boolean = false;
  public isFetching: boolean = false;
  public hasFailed: boolean = false;

  private log = this.$createLogger('Register');

  public onCaptchaVerified(response: any): void {
    this.log.info('VueRecaptcha is verified!');
    this.isVerified = !!response;
  }

  public onCaptchaExpired(): void {
    this.log.info('VueRecaptcha has expired!');
    this.isVerified = false;
  }

  public async onClickRegister(): Promise<void> {
    const isValid = await this.$validator.validateAll();
    this.log.info('The form is valid?', isValid);
    if (isValid && this.isVerified) {
      this.isFetching = true;
      try {
        await registerUser(this.username, this.email, this.password);
        this.isRegistered = true;
        this.$noty.success('message.register_successful');
      } catch (_) {
        this.hasFailed = true;
        this.$noty.error('message.register_failed');
      }
      this.isFetching = false;
    }
  }

}
</script>

<style scoped lang="scss">
img {
  position: absolute;
  right: 20px;
  top: 20px;
  border-radius: 100%;
}
</style>
