<template>
  <section class="teams-page">

    <div class="row">
      <div class="col">
        <h1>{{ $t('teams.title') }}</h1>
      </div>
      <div class="col text-right">

      </div>
    </div>

  <TeamInvitations></TeamInvitations>
  <MyTeams></MyTeams>


  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import TeamInvitations from '@/components/teams/TeamInvitations.vue';
import MyTeams from '@/components/teams/MyTeams.vue';

@Component({
  components: {
    TeamInvitations,
    MyTeams,
  },
})
export default class Teams extends Vue { }
</script>
