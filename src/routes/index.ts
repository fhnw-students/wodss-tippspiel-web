import { RouteConfig } from 'vue-router';

export const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/Home.vue'),
    meta: {
      auth: false,
      guest: false,
    },
  },
  {
    path: '/auth/login',
    name: 'auth.login',
    component: () => import('@/pages/auth/Login.vue'),
    meta: {
      auth: false,
      guest: true,
    },
  },
  {
    path: '/auth/register',
    name: 'auth.register',
    component: () => import('@/pages/auth/Registration.vue'),
    meta: {
      auth: false,
      guest: true,
    },
  },
  {
    path: '/auth/verify/:verificationToken',
    name: 'auth.verify',
    component: () => import('@/pages/auth/Verification.vue'),
    props: true,
    meta: {
      auth: false,
      guest: true,
    },
  },
  {
    path: '/auth/forgot-password',
    name: 'auth.forgot-password',
    component: () => import('@/pages/auth/ForgotPassword.vue'),
    meta: {
      auth: false,
      guest: true,
    },
  },
  {
    path: '/auth/reset-password/:resetToken',
    name: 'auth.reset-password',
    component: () => import('@/pages/auth/ResetPassword.vue'),
    props: true,
    meta: {
      auth: false,
      guest: true,
    },
  },
  {
    path: '/ranking',
    name: 'ranking',
    component: () => import('@/pages/Ranking.vue'),
    meta: {
      auth: true,
      guest: false,
    },
  },
  {
    path: '/users/:username/games',
    name: 'user.games',
    component: () => import('@/pages/UserGames.vue'),
    props: true,
    meta: {
      auth: true,
      guest: false,
    },
  },
  {
    path: '/teams/:teamId',
    name: 'team.detail',
    component: () => import('@/pages/TeamDetail.vue'),
    props: true,
    meta: {
      auth: true,
      guest: false,
    },
  },
  {
    path: '/teams',
    name: 'teams',
    component: () => import('@/pages/Teams.vue'),
    meta: {
      auth: true,
      guest: false,
    },
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@/pages/Settings.vue'),
    meta: {
      auth: true,
      guest: false,
    },
  },
  {
    path: '/admin/games',
    name: 'admin.games',
    component: () => import('@/pages/admin/AdminGames.vue'),
    meta: {
      auth: true,
      guest: false,
    },
  },
  {
    path: '/admin/create-game',
    name: 'admin.game.create',
    component: () => import('@/pages/admin/AdminCreateGame.vue'),
    meta: {
      auth: true,
      guest: false,
    },
  },
  {
    path: '*',
    component: () => import('@/pages/NotFound.vue'),
    meta: {
      auth: false,
      guest: false,
    },
  },
];
