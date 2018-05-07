<template>
  <header>
    <nav class="navbar navbar-expand-md fixed-top navbar-dark bg-primary">
      <div class="container">
        <router-link to="{ name: 'home' }" class="navbar-brand">
          <i class="fas fa-3x fa-trophy"></i>
        </router-link>

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
          aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="nav-body">
          <div class="title">
            <span>{{ $t("app.title") }}</span>
          </div>
          <div class="collapse navbar-collapse" id="navbarCollapse">

            <ul class="navbar-nav mr-auto">

              <router-link to="{ name: 'ranking' }" tag="li" class="nav-item" active-class="active">
                <a class="nav-link">{{ $t("ranking.title") }}</a>
              </router-link>

              <router-link to="{ name: 'games' }" tag="li" class="nav-item" active-class="active" v-if="isAuthenticated">
                <a class="nav-link">{{ $t("games.title") }}</a>
              </router-link>

              <router-link to="{ name: 'teams' }" tag="li" class="nav-item" active-class="active" v-if="isAuthenticated">
                <a class="nav-link">{{ $t("teams.title") }}</a>
              </router-link>

              <router-link :to="{ name: 'admin.games' }" tag="li" class="nav-item" active-class="active" v-if="isAuthenticated && currentUser && currentUser.admin">
                <a class="nav-link">{{ $t("admin.title") }}</a>
              </router-link>

            </ul>

            <NavProfile v-if="isAuthenticated"/>

            <router-link
              class="btn btn-outline-secondary my-2 my-md-2"
              v-if="!isAuthenticated && $route.name !== 'login'"
              to="/auth/login">
              {{ $t("login.sign_in") }}
            </router-link>
            <router-link
              class="btn btn-outline-secondary my-2 my-md-2"
              v-if="!isAuthenticated && $route.name !== 'register'"
              to="/auth/register">
              {{ $t("register.title") }}
            </router-link>

          </div>
        </div>
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

    .nav-body {
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    .title {
      color: white;
      font-family: 'dusha';
      font-size: 2em;
    }

    .nav-link {
      font-family: 'OpenSans-Bold'
    }

    a.navbar-brand {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0;

      img.logo {
        height: 100px;
      }

      svg {
        color: $yellow;
      }

      span {
        margin-left: 8px;
        font-family: 'dusha';
        font-size: 1.8em;
      }
    }

    .nav-link {
      text-transform: uppercase;
      font-weight: bold;
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


