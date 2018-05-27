<template>
  <div class="row">
    <div class="col-xl-12">
      <h2>{{ $t('teams.invite.title') }}</h2>
    </div>
    <form id="form" class="col-xl-12" @submit.prevent="submitForm">
      <div class="form-group row">
        <label class="col-sm-4 col-form-label" for="inputEmail">{{ $t('label.email') }}</label>
        <div class="col-sm-8">
          <input
            id="inputEmail"
            name="email"
            type="email"
            autocomplete="email"
            :data-vv-as="$t('label.email')"
            :disabled="isSubmitting"
            :class="{'form-control': true, 'is-invalid': errors.has('email') }"
            :placeholder="$t('placeholder.email')"
            v-validate="'required|email'"
            v-model="email"
            required />
            <div v-show="errors.has('email')" class="invalid-feedback">
              {{ errors.first('email') }}
            </div>
          </div>
      </div>

      <div class="row">
        <div class="offset-sm-4 col-sm-8">
          <button type="submit"
            :is-spinning="isSubmitting"
            class="btn btn-success"
            :disabled="errors.any() || isSubmitting">
            <span v-if="!isSubmitting">
              <i class="fas fa-paper-plane"></i>
              {{ $t('action.invite') }}
            </span>
            <Spinner v-if="isSubmitting"></Spinner>
          </button>
        </div>
      </div>

    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import * as teamApi from '@/services/api/team.api';
import { NewTeam } from '@/models/NewTeam';
import Spinner from '@/components/layout/Spinner.vue';

@Component({
  components: {
    Spinner,
  },
})
export default class TeamInviteForm extends Vue {

  @Prop()
  public teamId: number;

  public email: string = '';
  public isSubmitting: boolean = false;

  private log = this.$createLogger('TeamInviteForm');

  public async submitForm(): Promise<void> {
    const isValid = await this.$validator.validateAll();
    this.log.info('submitForm - The form is valid?', isValid);
    if (isValid) {
      this.isSubmitting = true;
      try {
        await teamApi.inviteUserToTeam(this.teamId, this.email);
        this.$noty.success('message.team_invitation_successfull');
        this.email = '';
        this.$validator.reset();
      } catch(_) {
        console.log(_);
        this.$noty.success('message.team_invitation_failed');
      }
      this.isSubmitting = false;
    }
  }

}
</script>
