<template>
  <section class="create-game-page">

    <div class="row page-title">
      <div class="col">
        <h1>{{ $t('admin.title') }}</h1>
        <h2>{{ $t('create_game.title') }}</h2>
      </div>
    </div>

    <div class="row">
      <form id="form" class="col" @submit.prevent="submitForm">

        <div class="form-group row">
          <label for="phase" class="col-sm-4 col-form-label">{{ $t('create_game.game_phase') }}*</label>
          <div class="col-sm-8">
            <select
              id="phase"
              name="phase"
              :class="{'form-control': true, 'custom-select': true, 'is-invalid': errors.has('phase') }"
              v-model="selectedPhase"
              :data-vv-as="$t('create_game.game_phase')"
              v-validate="'required'">
              <option disabled value="">{{ $t('create_game.select_game_phase') }}</option>
              <option v-for="phase in phases" :key="phase.id" :value="phase">{{ phase.name }}</option>
            </select>
            <div v-show="errors.has('phase')" class="invalid-feedback">
              {{ errors.first('phase') }}
            </div>
          </div>
        </div>

        <div class="form-group row">
          <label for="location" class="col-sm-4 col-form-label">{{ $t('create_game.location') }}*</label>
          <div class="col-sm-8">
            <select
              id="location"
              name="location"
              :class="{'form-control': true, 'custom-select': true, 'is-invalid': errors.has('location') }"
              :data-vv-as="$t('create_game.location')"
              v-validate="'required'"
              v-model="selectedLocation">
              <option disabled value="">{{ $t('create_game.select_location') }}</option>
              <option v-for="location in locations" :key="location.id" :value="location">{{ location.name }}</option>
            </select>
            <div v-show="errors.has('location')" class="invalid-feedback">
              {{ errors.first('location') }}
            </div>
          </div>
        </div>

        <div class="form-group row">
          <label for="game-date" class="col-sm-4 col-form-label">{{ $t('create_game.game_date') }}*</label>
          <div class="col-sm-4">
            <input
              id="game-date"
              name="game-date"
              type="date"
              :class="{'form-control': true, 'is-invalid': errors.has('game-date') }"
              :data-vv-as="$t('create_game.game_date')"
              v-validate="'required'"
              v-model="selectedDate">
            <div v-show="errors.has('game-date')" class="invalid-feedback">
              {{ errors.first('game-date') }}
            </div>
          </div>
          <div class="col-sm-4">
            <input
            id="game-time"
            name="game-time"
            type="time"
            :class="{'form-control': true, 'is-invalid': errors.has('game-time') }"
            :data-vv-as="$t('create_game.game_time')"
            v-validate="'required'"
            v-model="selectedTime">
            <div v-show="errors.has('game-time')" class="invalid-feedback">
              {{ errors.first('game-time') }}
            </div>
          </div>
        </div>

        <div class="form-group row">
          <label for="host" class="col-sm-4 col-form-label">{{ $t('create_game.host') }}*</label>
          <div class="col-sm-8">
            <select
              id="host"
              name="host"
              :class="{'form-control': true, 'custom-select': true, 'is-invalid': errors.has('host') }"
              :data-vv-as="$t('create_game.host')"
              v-validate="{ required: true, is_not: selectedGuest }"
              v-model="selectedHost">
              <option disabled value="">{{ $t('create_game.select_host') }}</option>
              <option v-for="nation in nations" :key="nation.id" :value="nation">{{ nation.name }}</option>
            </select>
            <div v-show="errors.has('host')" class="invalid-feedback">
              {{ errors.first('host') }}
            </div>
          </div>
        </div>

        <div class="form-group row">
          <label for="guest" class="col-sm-4 col-form-label">{{ $t('create_game.guest') }}*</label>
          <div class="col-sm-8">
            <select
              id="guest"
              name="guest"
              :class="{'form-control': true, 'custom-select': true, 'is-invalid': errors.has('guest') }"
              :data-vv-as="$t('create_game.guest')"
              v-validate="{ required: true, is_not: selectedHost }"
              v-model="selectedGuest">
              <option disabled value="">{{ $t('create_game.select_guest') }}</option>
              <option v-for="nation in nations" :key="nation.id" :value="nation">{{ nation.name }}</option>
            </select>
            <div v-show="errors.has('guest')" class="invalid-feedback">
              {{ errors.first('guest') }}
            </div>
          </div>
        </div>

        <div class="row">
          <div class="offset-sm-4 col-sm-8">
            <button type="submit"
              :is-spinning="isSubmitting"
              class="btn btn-success"
              :disabled="errors.any() || isSubmitting || isLoadingFormData">
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


  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import * as _ from 'lodash';
import * as moment from 'moment';
import Component from 'vue-class-component';

import * as gameApi from '@/services/api/game.api';
import * as gamePhaseApi from '@/services/api/gamePhase.api';
import * as locationApi from '@/services/api/location.api';
import * as nationApi from '@/services/api/nation.api';
import { GamePhase } from '@/models/GamePhase';
import { Location } from '@/models/Location';
import { Nation } from '@/models/Nation';
import { NewGame } from '@/models/NewGame';
import Spinner from '@/components/layout/Spinner.vue';

@Component({
  components: {
    Spinner,
  },
})
export default class AdminCreateGame extends Vue {

  public isLoadingFormData: boolean = false;
  public isSubmitting: boolean = false;

  public selectedPhase: GamePhase | string = '';
  public selectedLocation: Location | string = '';
  public selectedHost: Nation | string = '';
  public selectedGuest: Nation | string = '';
  public selectedDate: string = moment().format('YYYY-MM-DD');
  public selectedTime: string = moment().format('HH:mm');

  public phases: GamePhase[] = [];
  public locations: Location[] = [];
  public nations: Nation[] = [];

  private log = this.$createLogger('AdminCreateGame');

  public created(): void {
    this.loadFormData();
  }

  public async submitForm(): Promise<void> {
    const isValid = await this.$validator.validateAll();
    this.log.info('submitForm - The form is valid?', isValid);
    if (isValid) {
      this.isSubmitting = true;
      const date = moment(`${this.selectedDate} ${this.selectedTime}`).toDate();
      const game = NewGame.buildNewGame(
        this.selectedPhase as GamePhase,
        this.selectedLocation as Location,
        date,
        this.selectedHost as Nation,
        this.selectedGuest as Nation
      );
      await gameApi.createGame(game);
      this.$noty.success('message.create_game_successful');
      this.$router.push({
        name: 'admin.games',
      });
    }
  }

  private async loadFormData(): Promise<void> {
    this.isLoadingFormData = true;
    this.phases = await gamePhaseApi.getAllGamePhases();
    this.locations = await locationApi.getAllLocations();
    this.locations = _.sortBy<Location>(await locationApi.getAllLocations(), [(location: Location) => location.name]);
    this.nations = _.sortBy<Nation>(await nationApi.getAllNations(), [(nation: Nation) => nation.name]);
    this.isLoadingFormData = false;
  }

}
</script>
