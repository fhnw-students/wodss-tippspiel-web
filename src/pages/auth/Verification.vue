<template>
  <section class="register-page">
    <div class="row justify-content-sm-center">

        <AlertCard
          v-if="!isFetching"
          :icon="'fa-envelope'"
          :type="'success'"
          :title="$t('verification.success.title')"
          :message="$t('verification.success.message')">
        </AlertCard>

        <AlertCard
          v-if="isFetching"
          :icon="'fa-envelope'"
          :type="'pending'"
          :title="$t('verification.pending.title')"
          :message="$t('verification.pending.message')">
        </AlertCard>

    </div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

import AlertCard from '@/components/layout/AlertCard.vue';
import { verifyUser } from '@/services/api/auth.api';

@Component({
  components: {
    AlertCard,
  },
})
export default class Verification extends Vue {

  @Prop()
  public verificationToken: string;

  public isFetching: boolean = false;
  public hasFailed: boolean = false;

  private log = this.$createLogger('Verification');

  public async created(): Promise<void> {
    this.log.info('Verifing the user with the given token ', this.verificationToken);
    this.isFetching = true;
    try {
      await verifyUser(this.verificationToken);
      this.$noty.success('message.verification_successful');
      this.$router.push({
        name: 'auth.login',
      });
    } catch (_) {
      this.hasFailed = true;
    }
    this.isFetching = false;
  }

}
</script>
