<template>
  <div class="container">
    <div class="row justify-content-sm-center">
      <div class="col col-sm-6 col-md-6 card">
        <div class="card-body">
          <div v-if="isValidSubmission">
            <h2>
              <i class="fas fa-check"></i>
            </h2>
            <p v-html="$t('reset.successMessage', {email: email})"></p>

          </div>
          <div v-else>
            <h2>{{ $t('reset.title') }}</h2>
            <div class="form-group">
              <label for="inputEmail">{{ $t('reset.email') }}</label>
              <input
                id="inputEmail"
                name="email"
                type="email"
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
              v-on:click="onClickReset()">
              {{ $t('reset.submit') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
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
