<template>
  <div class="nav-item btn-group">
    <button type="button" class="btn btn-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <Gravatar :email="'hirschi1988@gmail.com'" :size="45" />
    </button>
    <div class="dropdown-menu dropdown-menu-right">
      <router-link class="dropdown-item account" to="profile">
        <Gravatar :email="'hirschi1988@gmail.com'" :size="60" />
        <p>Gery Hirschfeld</p>
        <small>hirschi1988@gmail.com</small>
      </router-link>
      <div class="dropdown-divider"></div>
      <router-link class="dropdown-item" to="profile">
        <i class="fas fa-user"></i>
        {{ $t("nav.profile") }}
      </router-link>
      <button class="dropdown-item" type="button" @click="onSignOutUser()">
        <i class="fas fa-sign-out-alt"></i>
        {{ $t("nav.sign_out") }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

import Gravatar from './Gravatar.vue';
import { AuthGetters, AuthActions, Credentials } from '@/states/modules/auth';

@Component({
  components: {
    Gravatar,
  },
})
export default class NavProfile extends Vue {

  @Action(AuthActions.SignOutUser)
  public signOutUser: () => void;

  public onSignOutUser(): void {
    this.signOutUser();
    this.$router.push('/');
  }

}
</script>

<style lang="scss" scoped>
@import "../../styles/colors";

img {
  border-radius: 100%;
}

.dropdown-toggle::after {
  display: none;
}

.dropdown-menu-right {
  right: 0;
  left: auto;
}

.dropdown-item {
  color: $primary;
  cursor: pointer;
  svg {
    margin-right: 10px;
  }
}

.account {
  text-align: center !important;
  p {
    margin-top: 15px;
    margin-bottom: 0px;
    color: black;
  }
  small {
    color: gray;
  }
}
</style>

