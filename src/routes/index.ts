import { RouteConfig } from 'vue-router';

export const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/Home.vue'),
    meta: {
      requiresAuth: false,
      guest: false,
    },
  },
  {
    path: '/auth/login',
    name: 'auth.login',
    component: () => import('@/pages/auth/Login.vue'),
    meta: {
      requiresAuth: false,
      guest: true,
    },
  },
  {
    path: '/auth/register',
    name: 'auth.register',
    component: () => import('@/pages/auth/Registration.vue'),
    meta: {
      requiresAuth: false,
      guest: true,
    },
  },
  {
    path: '/auth/verify/:verificationToken',
    name: 'auth.verify',
    component: () => import('@/pages/auth/Verification.vue'),
    props: true,
    meta: {
      requiresAuth: false,
      guest: true,
    },
  },
  {
    path: '/auth/forgot-password',
    name: 'auth.forgot-password',
    component: () => import('@/pages/auth/ForgotPassword.vue'),
    meta: {
      requiresAuth: false,
      guest: true,
    },
  },
  {
    path: '/auth/reset-password/:resetToken',
    name: 'auth.reset-password',
    component: () => import('@/pages/auth/ResetPassword.vue'),
    props: true,
    meta: {
      requiresAuth: false,
      guest: true,
    },
  },
  {
    path: '/ranking',
    name: 'ranking',
    component: () => import('@/pages/Ranking.vue'),
    meta: {
      requiresAuth: false,
      guest: false,
    },
  },
  {
    path: '/games',
    name: 'games',
    component: () => import('@/pages/Games.vue'),
    meta: {
      requiresAuth: true,
      guest: false,
    },
  },
  {
    path: '/teams',
    name: 'teams',
    component: () => import('@/pages/Teams.vue'),
    meta: {
      requiresAuth: true,
      guest: false,
    },
  },
  {
    path: '*',
    component: () => import('@/pages/NotFound.vue'),
    meta: {
      requiresAuth: false,
      guest: false,
    },
  },
];
