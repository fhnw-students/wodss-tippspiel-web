<template>
  <section class="teams-page">

    <div class="row">
      <div class="col">
        <h1>{{ $t('teams.title') }}</h1>
      </div>
      <div class="col text-right">
        <spinner-button class="btn-primary btn">
          <i class="fas fa-plus"></i>
          {{$t("teams.create_team")}}
        </spinner-button>
      </div>
    </div>


    <div class="row justify-content-sm-center">

    </div>
  </section>
</template>


