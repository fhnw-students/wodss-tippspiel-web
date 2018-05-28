<template>
  <div class="row">
    <div class="col-xl-12">
      <h2>{{ $t('teams.update.title') }}</h2>
    </div>
    <form id="form" class="col-xl-12" @submit.prevent="submitForm">
      <div class="form-group row">
        <label class="col-sm-4 col-form-label" for="inputTeamname">{{ $t('label.teamname') }}</label>
        <div class="col-sm-8">
          <input
            id="inputTeamname"
            name="teamname"
            type="text"
            autocomplete="teamname"
            :data-vv-as="$t('label.teamname')"
            :disabled="isSubmitting"
            :class="{'form-control': true, 'is-invalid': errors.has('teamname') }"
            :placeholder="$t('placeholder.teamname')"
            v-validate="'required|min:3'"
            v-model="teamname"
            required />
            <div v-show="errors.has('teamname')" class="invalid-feedback">
              {{ errors.first('teamname') }}
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
              <i class="fas fa-check"></i>
              {{ $t('action.save') }}
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
import { Team } from '@/models/Team';

@Component({
  components: {
    Spinner,
  },
})
export default class TeamUpdateForm extends Vue {

  @Prop()
  public team: Team;

  public teamname = '';

  public isSubmitting: boolean = false;

  private log = this.$createLogger('TeamUpdateForm');

  public created(): void {
    this.teamname = this.team.name;
  }

  public async submitForm(): Promise<void> {
    const isValid = await this.$validator.validateAll();
    this.log.info('submitForm - The form is valid?', isValid);
    if (isValid) {
      this.isSubmitting = true;
      try {
        const newTeam = Team.updateTeam(this.team, this.teamname);
        await teamApi.updateTeam(newTeam);
        this.$eventBus.$emit('TEAM_UPDATED', this.team);
        this.$noty.success('message.team_update_successfull');
        this.$validator.reset();
      } catch (_) {
        this.$noty.error('message.team_update_failed');
      }
      this.isSubmitting = false;
    }
  }

}
</script>
