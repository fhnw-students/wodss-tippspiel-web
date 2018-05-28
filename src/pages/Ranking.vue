<template>
  <section class="ranking-page">

    <div class="row page-title">
      <div class="col">
        <h1>{{ $t('ranking.title') }}</h1>
      </div>
    </div>

    <UserRanking />

    <hr class="lined divided">

    <TeamRanking />

  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import UserRanking from '@/components/ranking/UserRanking.vue';
import TeamRanking from '@/components/ranking/TeamRanking.vue';

@Component({
  components: {
    UserRanking,
    TeamRanking,
  },
})
export default class Ranking extends Vue { }
</script>
