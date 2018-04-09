import Vue from 'vue';
import Router from 'vue-router';

import Games from './views/Games.vue';
import Home from './views/Home.vue';
import NotFound from './views/NotFound.vue';

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', name: 'home', component: Home, meta: { requiresAuth: false } },
    { path: '/games', name: 'games', component: Games, meta: { requiresAuth: true } },
    { path: '*', component: NotFound, meta: { requiresAuth: false } },
  ],
});
