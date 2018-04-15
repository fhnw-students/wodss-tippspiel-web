import Vue from 'vue';
import Router, { RawLocation, Route } from 'vue-router';
import { Store } from 'vuex';

import { State } from '@/states/state';
import { AuthGetters } from './states/modules/auth/index';
import Games from './views/Games.vue';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import NotFound from './views/NotFound.vue';
import Ranking from './views/Ranking.vue';
import Register from './views/Register.vue';
import ResetPassword from './views/ResetPassword.vue';
import Teams from './views/Teams.vue';

Vue.use(Router);

export const getRouter = (store: Store<State>) => {

  /**
   * Checks if the user is authenticated and redirects him to
   * the default entry page
   */
  const checkIfAuthenticated = (to: Route, from: Route, next: (to?: RawLocation | false | ((vm: Vue) => any) | void) => void) => {
    if (store.getters[AuthGetters.IsAuthenticated]) {
      return next('games');
    }
    next();
  };

  /**
   * All the defined routes of our application.
   */
  const router = new Router({
    routes: [
      {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
          requiresAuth: false,
        },
        beforeEnter: checkIfAuthenticated,
      },
      {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
          requiresAuth: false,
        },
        beforeEnter: checkIfAuthenticated,
      },
      {
        path: '/reset-password',
        name: 'reset-password',
        component: ResetPassword,
        meta: {
          requiresAuth: false,
        },
        beforeEnter: checkIfAuthenticated,
      },
      {
        path: '/ranking',
        name: 'ranking',
        component: Ranking,
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: '/games',
        name: 'games',
        component: Games,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/teams',
        name: 'teams',
        component: Teams,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '*',
        component: NotFound,
        meta: {
          requiresAuth: false,
        },
      },
    ],
  });

  /**
   * This before hooks checks if a user is authenticated or not and forces
   * him to the login page if not.
   */
  router.beforeEach((to, from, next) => {
    if (to.matched.some((record: any) => record.meta.requiresAuth)) {
      // this route requires auth, check if logged in
      // if not, redirect to login page.
      if (store.getters[AuthGetters.IsAuthenticated]) {
        return next();
      }

      return next({
        path: '/login',
        // TODO: Handle fullPath
        // query: { redirect: to.fullPath },
      });

    }

    next(); // make sure to always call next()!

  });

  return router;
};
