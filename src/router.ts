import Vue from 'vue';
import Router from 'vue-router';

import Games from './views/Games.vue';
import Home from './views/Home.vue';
import NotFound from './views/NotFound.vue';
import { AuthGetters } from './states/modules/auth/index';

Vue.use(Router);

export const getRouter = (store: any) => {

  const router = new Router({
    mode: 'history',
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
        path: '/games',
        name: 'games',
        component: Games,
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

  router.beforeEach((to, from, next) => {
    if (to.matched.some((record: any) => record.meta.requiresAuth)) {
      // this route requires auth, check if logged in
      // if not, redirect to login page.
      if (!store.getters[AuthGetters.IsAuthenticated]) {
        next({
          path: '/login',
          // query: { redirect: to.fullPath },
        });
      } else {
        next();
      }
    } else {
      next(); // make sure to always call next()!
    }
  });

  return router;
};
