<template>
  <div class="register-page container">
    <div class="row justify-content-sm-center">
      <div class="card col-sm-12 col-md-6">
        <form class="card-body" noValidate>

          <h2>{{ $t('register.title') }}</h2>

          <div class="form-group">
            <label for="inputUsername">{{ $t('label.username') }}</label>
            <input
              id="inputUsername"
              name="username"
              type="text"
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
              type="text"
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
            <p>TODO: I' am no Robot!</p>
          </div>

          <button
            type="button"
            class="btn btn-lg btn-primary btn-block"
            v-on:click="onClickRegister()">
            {{ $t("register.submit" )}}
          </button>

        </form>
      </div>
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
  public passwordConfirm = '';

  private log = this.$createLogger(this);

  public async onClickRegister(): Promise<void> {
    const isValid = await this.$validator.validateAll();
    this.log.info('The form is valid?', isValid);
    if (isValid) {
      // TODO: Send register action
    }
  }

}
</script>

<style lang="scss">
</style>
