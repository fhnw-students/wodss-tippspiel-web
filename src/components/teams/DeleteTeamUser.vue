<template>
  <button type="submit"
    :is-spinning="isSubmitting"
    class="btn btn-danger"
    @click="submit"
    :disabled="errors.any() || isSubmitting">
    <span v-if="!isSubmitting">
      <i class="fas fa-trash"></i>
      {{ $t('action.delete') }}
    </span>
    <Spinner v-if="isSubmitting"></Spinner>
  </button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import * as teamApi from '@/services/api/team.api';
import Spinner from '@/components/layout/Spinner.vue';

@Component({
  components: {
    Spinner,
  },
})
export default class DeleteTeamUser extends Vue {

  @Prop()
  public teamId: number;

  @Prop()
  public userId: number;

  public isSubmitting: boolean = false;

  public async submit(): Promise<void> {
    if (this.teamId && this.userId) {
      this.isSubmitting = true;
      try {
        await teamApi.deleteUserFromTeam(this.teamId, this.userId);
        this.$eventBus.$emit('TEAM_USER_REMOVED');
        this.$noty.success('message.team_user_delete_successful');
        this.$validator.reset();
      } catch (_) {
        this.$noty.error('message.team_user_delete_failed');
      }
      this.isSubmitting = false;
    }
  }

}
</script>
