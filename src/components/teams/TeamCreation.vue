<template>
  <div class="row">
    <div class="col-xl-12">
      <h2>{{ $t('teams.create_title') }}</h2>
    </div>

    <form id="form" class="col-xl-12" @submit.prevent="submitForm">
      <div class="form-group row">
        <label class="col-sm-4 col-form-label" for="inputTeamname">{{ $t('teams.create_subtitle') }}</label>
        <div class="col-sm-8">
          <input
            id="inputTeamname"
            type="text"
            name="teamname"
            :placeholder="$t('teams.create_enter_teamname')"
            :data-vv-as="$t('label.textfield_create_team')"
            :class="{'form-control': true, 'is-invalid': errors.has('teamname') }"
            :disabled="isLoading"
            v-validate="'required|min:3|max:45'"
            v-model.trim="teamname"
            required>
            <div v-show="errors.has('teamname')" class="invalid-feedback">
              {{ errors.first('teamname') }}
            </div>
        </div>
      </div>

      <div class="row">
        <div class="offset-sm-4 col-sm-8">
          <button type="submit"
            :is-spinning="isLoading"
            :disabled="errors.any() || isLoading"
            class="btn btn-success">
            <span v-if="!isLoading">
              <i class="fas fa-plus"></i>
              {{$t('teams.create_submit')}}
            </span>
            <Spinner v-if="isLoading"></Spinner>
          </button>
        </div>
      </div>

    </form>
  </div>
</template>


<script lang="ts">
import { Prop, Component, Vue, Watch } from 'vue-property-decorator';

import { NewTeam } from '@/models/NewTeam';
import * as teamApi from '@/services/api/team.api';
import Spinner from '@/components/layout/Spinner.vue';

@Component({
  components: {
    Spinner,
  },
})
export default class TeamCreation extends Vue {
  public isLoading: boolean = false;

  public teamname = '';

  private log = this.$createLogger('TeamCreation');

  public async submitForm(): Promise<void> {
    const isValid = await this.$validator.validateAll();
    this.log.info('submitForm - The form is valid?', isValid);
    if (isValid) {
      this.isLoading = true;
      const newTeam = NewTeam.buildNewTeam(this.teamname);

      try {
        const createdTeam = await teamApi.createTeam(newTeam);
        this.$noty.success('message.create_team_successful');
        this.$validator.reset();

        this.$router.push({
          name: 'team.detail',
          params: {
            teamId: createdTeam.id.toString(),
          },
        });

      } catch (_) {
        this.$noty.error('message.create_team_failed');
      }
      this.isLoading = false;
    }
  }

}
</script>
