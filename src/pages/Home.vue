<template>
  <section class="home-page">

    <div class="row page-title">
      <div class="col">
        <h1>{{ $t('home.title') }}</h1>
        <h2>{{ $t('home.sub_title') }}</h2>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <p>{{ $t('home.description') }}</p>
      </div>
    </div>

    <div class="row d-block d-sm-none">
      <div class="col text-center">
        <router-link
          class="btn btn-primary my-2 my-md-2"
          to="/auth/login">
          {{ $t('login.sign_in') }}
        </router-link>
      </div>
    </div>

    <div class="row">
      <div class="col text-center">
        <router-link
          class="btn btn-success my-2 my-md-2"
          to="/auth/register">
          {{ $t('register.title') }}
        </router-link>
      </div>
    </div>

  </section>
</template>
