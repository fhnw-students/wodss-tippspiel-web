<template>
  <div class="container">
    <div class="row justify-content-sm-center">
      <div class="col col-sm-6 col-md-6 card">
        <div class="card-body">
          <h1>Passwort zurücksetzen</h1>
          <div class="form-group">
            <label for="inputEmail">{{ $t('label.email') }}</label>
            <input
              id="inputEmail"
              name="email"
              type="email"
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
            v-on:click="onClickReset()">
            Passwort zurücksetzen
          </button>
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

}
</script>
