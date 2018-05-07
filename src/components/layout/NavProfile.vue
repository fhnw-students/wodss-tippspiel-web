<template>
  <div class="nav-item btn-group">
    <button type="button" class="btn btn-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <Gravatar :email="currentUser.email" :size="45" />
    </button>
    <div class="dropdown-menu dropdown-menu-right">
      <div class="profile">
        <Gravatar :email="currentUser.email" :size="60" />
        <p>
          {{currentUser.username}}
          <span v-if="currentUser.admin" ref="adminIcon" data-toggle="tooltip" data-placement="bottom" :title="$t('nav.admin')">
            <i class="fas fa-key"></i>
          </span>
        </p>
        <small>{{currentUser.email}}</small>
      </div>
      <div class="dropdown-divider"></div>

      <router-link
        class="dropdown-item"
        to="/settings">
        <i class="fas fa-cog"></i>
        {{ $t('settings.title') }}
      </router-link>

      <button class="dropdown-item" type="button" @click="onSignOutUser()">
        <i class="fas fa-sign-out-alt"></i>
        {{ $t('nav.sign_out') }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

import Gravatar from './Gravatar.vue';
import { AuthGetters, AuthActions, Credentials } from '@/store/modules/auth';
import { UserActions, UserGetters } from '@/store/modules/user';
import { User } from '@/models/User';

@Component({
  components: {
    Gravatar,
  },
})
export default class NavProfile extends Vue {

  @Getter(UserGetters.GetCurrentUser)
  public currentUser: User;

  @Action(AuthActions.SignOutUser)
  public signOutUser: () => void;

  @Action(UserActions.LoadCurrentUser)
  public getCurrentUser: () => User;

  public created(): void {
    this.getCurrentUser();
  }

  public mounted(): void {
    $(document).ready(() => ($(this.$refs.adminIcon) as any).tooltip());
  }

  public onSignOutUser(): void {
    this.signOutUser();
    this.$router.push({
      name: 'home',
    });
  }

}
</script>

<style lang="scss" scoped>
  @import "../../styles/colors";

  img {
    border-radius: 100%;
  }

  div.profile {
    text-align: center;
    padding: 5px 15px;

    p {
      margin: 0;
      margin-top: 5px;
    }
  }

  .fa-key {
    color: $yellow;
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

