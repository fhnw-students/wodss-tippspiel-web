<template>
  <section class="reset-password-page">
    <div class="row justify-content-sm-center">

      <AlertCard
        type="success"
        v-if="isValidSubmission"
        icon="fa-envelope"
        :title="$t('reset.success_title')"
        :message="$t('reset.success_message', {email: email})" />

      <div v-if="!isValidSubmission" class="col col-sm-6 col-md-6">
        <div class="card">
          <div class="card-body">
            <h2>{{ $t('reset.title') }}</h2>
            <div class="form-group">
              <input
                id="inputEmail"
                name="email"
                type="email"
                autocomplete="email"
                :data-vv-as="$t('reset.email')"
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
              {{ $t('reset.submit') }}
            </button>

          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import AlertCard from '@/components/layout/AlertCard.vue';

@Component({
  components: {
    AlertCard,
  },
})
export default class ResetPassword extends Vue {

  public isValidSubmission = false;
  public email = '';

  public async onClickReset(): Promise<void> {
    const isValid = await this.$validator.validateAll();
    if (isValid) {
      this.isValidSubmission = true;
      // TODO: Send Reset action
    }
  }
}
</script>
