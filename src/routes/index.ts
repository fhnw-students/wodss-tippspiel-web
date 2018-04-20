import { RouteConfig } from 'vue-router';

import ForgotPassword from '@/views/auth/ForgotPassword.vue';
import Login from '@/views/auth/Login.vue';
import Registration from '@/views/auth/Registration.vue';
import ResetPassword from '@/views/auth/ResetPassword.vue';
import Verification from '@/views/auth/Verification.vue';
import Games from '@/views/Games.vue';
import Home from '@/views/Home.vue';
import NotFound from '@/views/NotFound.vue';
import Ranking from '@/views/Ranking.vue';
import Teams from '@/views/Teams.vue';

export const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      requiresAuth: false,
      guest: false,
    },
  },
  {
    path: '/auth/login',
    name: 'auth.login',
    component: Login,
    meta: {
      requiresAuth: false,
      guest: true,
    },
  },
  {
    path: '/auth/register',
    name: 'auth.register',
    component: Registration,
    meta: {
      requiresAuth: false,
      guest: true,
    },
  },
  {
    path: '/auth/verify/:verificationToken',
    name: 'auth.verify',
    component: Verification,
    props: true,
    meta: {
      requiresAuth: false,
      guest: true,
    },
  },
  {
    path: '/auth/forgot-password',
    name: 'auth.forgot-password',
    component: ForgotPassword,
    meta: {
      requiresAuth: false,
      guest: true,
    },
  },
  {
    path: '/auth/reset-password/:resetToken',
    name: 'auth.reset-password',
    component: ResetPassword,
    props: true,
    meta: {
      requiresAuth: false,
      guest: true,
    },
  },
  {
    path: '/ranking',
    name: 'ranking',
    component: Ranking,
    meta: {
      requiresAuth: false,
      guest: false,
    },
  },
  {
    path: '/games',
    name: 'games',
    component: Games,
    meta: {
      requiresAuth: true,
      guest: false,
    },
  },
  {
    path: '/teams',
    name: 'teams',
    component: Teams,
    meta: {
      requiresAuth: true,
      guest: false,
    },
  },
  {
    path: '*',
    component: NotFound,
    meta: {
      requiresAuth: false,
      guest: false,
    },
  },
];
