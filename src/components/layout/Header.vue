<template>
  <header>

    <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
      <div class="container">

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <router-link :to="{ name: 'home' }" class="navbar-brand">
          <i class="fas fa-2x fa-trophy"></i>
        </router-link>

        <NavProfile class="d-lg-none d-xl-none" v-if="isAuthenticated"/>

        <div class="collapse navbar-collapse" id="navbarToggler">

          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <router-link :to="{ name: 'ranking' }" tag="li" class="nav-item" active-class="active" v-if="isAuthenticated">
              <a class="nav-link">{{ $t('ranking.title') }}</a>
            </router-link>

            <router-link :to="{ name: 'user.games', params: { username: currentUser.username } }" tag="li" class="nav-item" active-class="active" v-if="isAuthenticated">
              <a class="nav-link">{{ $t('games.title') }}</a>
            </router-link>

            <router-link :to="{ name: 'teams' }" tag="li" class="nav-item" active-class="active" v-if="isAuthenticated">
              <a class="nav-link">{{ $t('teams.title') }}</a>
            </router-link>

            <router-link :to="{ name: 'admin.games' }" tag="li" class="nav-item" active-class="active" v-if="isAuthenticated && currentUser && currentUser.admin">
              <a class="nav-link">{{ $t('admin.title') }}</a>
            </router-link>

            <router-link :to="{ name: 'auth.login' }" tag="li" class="nav-item d-block d-lg-none" active-class="active" v-if="!isAuthenticated">
              <a class="nav-link">{{ $t('login.sign_in') }}</a>
            </router-link>

            <router-link :to="{ name: 'auth.register' }" tag="li" class="nav-item d-block d-lg-none" active-class="active" v-if="!isAuthenticated">
              <a class="nav-link">{{ $t('register.title') }}</a>
            </router-link>

          </ul>

          <div class="my-2 my-lg-0 d-none d-lg-block">

            <router-link
              class="btn btn-outline-secondary my-2 my-md-2"
              v-if="!isAuthenticated && $route.name !== 'auth.login'"
              to="/auth/login">
              {{ $t('login.sign_in') }}
            </router-link>
            <router-link
              class="btn btn-outline-secondary my-2 my-md-2"
              v-if="!isAuthenticated && $route.name !== 'auth.register'"
              to="/auth/register">
              {{ $t('register.title') }}
            </router-link>

          </div>

        </div>

        <NavProfile class="d-none d-lg-block d-xl-block" v-if="isAuthenticated"/>

      </div>

    </nav>

  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

import { AuthGetters } from '@/store/modules/auth';
import NavProfile from './NavProfile.vue';
import { UserGetters } from '@/store/modules/user';
import { User } from '@/models/User';

@Component({
  components: {
    NavProfile,
  },
})
export default class Header extends Vue {

  @Getter(AuthGetters.IsAuthenticated)
  public isAuthenticated: boolean;

  @Getter(UserGetters.GetCurrentUser)
  public currentUser: User;

}
</script>

<style lang="scss">
  @import '../../styles/colors';

  nav.navbar {
    padding-top: 4px;
    padding-bottom: 4px;

    a.navbar-brand {
      padding: 0;

      svg {
        color: $yellow;
      }

      span {
        margin-left: 8px;
        font-family: 'dusha';
      }
    }

    .nav-link {
      font-family: 'OpenSans-Bold';
      text-transform: uppercase;
      font-weight: bold;
      font-size: 1.1em;
    }

    a.dropdown-item {
      cursor: pointer;
    }

    a.btn-outline-secondary {
      margin-left: 10px;
      background: rgba($color: #BBB28D, $alpha: .15);
      border-width: 2px;
    }
  }

</style>


