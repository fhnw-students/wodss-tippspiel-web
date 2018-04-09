<template>
  <div class="home-page container">
    <div class="row">
      <div class="col col-sm-8">
        <h1>{{ $t("home.title") }}</h1>
        <h2>{{ $t("home.sub_title") }}</h2>
        <p class="lead">{{ $t("home.description") }}</p>
      </div>
      <div class="col col-sm-4">
        <Login />
        <div class="row links">
          <div class="col col-sm-6">
            <!-- <Link to="/register" >{t("HOME.REGISTER_LINK")}</Link> -->
          </div>
          <div class="col col-sm-6 text-right">
            <!-- <Link to="/reset-password" >{t("HOME.RESET_PASSWORD")}</Link> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Login from '@/components/auth/Login.vue';

@Component({
  components: {
    Login,
  },
})
export default class Home extends Vue {

}
</script>
