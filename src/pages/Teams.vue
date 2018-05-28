<template>
  <section class="teams-page">

    <div class="row">
      <div class="col">
        <h1>{{ $t('teams.title') }}</h1>
      </div>
    </div>

    <TeamInvitations />

    <MyTeams />

    <hr class="lined divded">

    <TeamCreaation />

  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import TeamInvitations from '@/components/teams/TeamInvitations.vue';
import TeamCreaation from '@/components/teams/TeamCreation.vue';
import MyTeams from '@/components/teams/MyTeams.vue';

@Component({
  components: {
    TeamInvitations,
    MyTeams,
    TeamCreaation,
  },
})
export default class Teams extends Vue {}
</script>
