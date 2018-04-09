import Vue from 'vue';
import Router from 'vue-router';

import Games from './views/Games.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import NotFound from './views/NotFound.vue';
import { AuthGetters } from './states/modules/auth/index';

Vue.use(Router);

export const getRouter = (store: any) => {

  const router = new Router({
    mode: 'history',
    routes: [
      {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: '/',
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
