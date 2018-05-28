<template>
  <section class="reset-password-page">
    <div class="row justify-content-sm-center">

      <div class="col col-sm-6 col-md-6">
        <div class="card">
          <form class="card-body" novalidate>
            <h2>{{ $t('reset_password.title') }}</h2>

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

            <button
              type="button"
              class="btn btn-lg btn-primary btn-block"
              @click="onClickReset()">
              {{ $t('reset_password.submit') }}
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
import { resetUserPassword } from '@/services/api/auth.api';
import { Prop } from 'vue-property-decorator';

@Component({
  components: {
    AlertCard,
  },
})
export default class ResetPassword extends Vue {

  @Prop()
  public resetToken: string;

  public isFetching: boolean = false;
  public hasFailed: boolean = false;

  public password: string = '';
  public passwordConfirm: string = '';

  public async onClickReset(): Promise<void> {
    const isValid = await this.$validator.validateAll();
    if (isValid) {
      this.isFetching = true;
      try {
        await resetUserPassword(this.resetToken, this.password);
        this.$noty.success('message.reset_password_successful');
        this.$router.push({
          name: 'auth.login',
        });
      } catch (_) {
        this.hasFailed = true;
        this.$noty.error('message.reset_password_failed');
      }
      this.isFetching = false;
    }
  }
}
</script>
