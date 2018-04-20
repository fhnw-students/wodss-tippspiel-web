<template>
  <section class="reset-password-page">
    <div class="row justify-content-sm-center">

      <AlertCard
        type="success"
        v-if="isRequested"
        icon="fa-envelope"
        :title="$t('forgot_password.success_title')"
        :message="$t('forgot_password.success_message', {email: email})" />

      <div v-if="!isRequested" class="col col-sm-6 col-md-6">
        <div class="card">
          <form class="card-body" novalidate>
            <h2>{{ $t('forgot_password.title') }}</h2>
            <div class="form-group">
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
                required />
              <div v-show="errors.has('email')" class="invalid-feedback">
                {{ errors.first('email') }}
              </div>
            </div>
            <button
              type="button"
              class="btn btn-lg btn-primary btn-block"
              @click="onClickReset()">
              {{ $t('forgot_password.submit') }}
            </button>

          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import AlertCard from '@/components/layout/AlertCard.vue';
import { forgotPassword } from '@/services/api/auth.api';

@Component({
  components: {
    AlertCard,
  },
})
export default class ForgotPassword extends Vue {

  public isFetching: boolean = false;
  public hasFailed: boolean = false;
  public isRequested: boolean = false;
  public email: string = '';

  public async onClickReset(): Promise<void> {
    const isValid = await this.$validator.validateAll();
    if (isValid) {
      this.isFetching = true;
      try {
        await forgotPassword(this.email);
        this.isRequested = true;
      } catch (_) {
        this.hasFailed = true;
        this.$noty.error('message.forgot_password_failed');
      }
      this.isFetching = false;
    }
  }
}
</script>
