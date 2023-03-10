import Vue from 'vue';
import VueRouter from 'vue-router';

import NotFound from './NotFound.vue';

import PostsPage from './components/Post/PostsPage.vue';
import AccountPage from './components/Account/AccountPage.vue';
import LoginPage from './components/Login/LoginPage.vue';
import FriendPage from './components/Friend/FriendPage.vue';
import SessionPage from './components/Session/SessionPage.vue';
import DrawingPage from './components/Drawing/DrawingsPage.vue';
import DrawPage from './components/Drawing/DrawPage.vue';
import ProfilePage from './components/Profile/ProfilePage.vue';

Vue.use(VueRouter);

const routes = [
  {path: '/', name: 'Home', component: PostsPage},
  {path: '/account', name: 'Account', component: AccountPage},
  {path: '/login', name: 'Login', component: LoginPage},
  {path: '*', name: 'Not Found', component: NotFound},
  {path: '/friend', name: 'Friends', component: FriendPage},
  {path: '/session', name: 'Session', component: SessionPage},
  {path: '/draw/:drawingId?', name: 'Draw', component: DrawPage},
  {path: '/drawing', name: 'Drawing', component: DrawingPage},
  {path: '/profile', name: 'Profile', component: ProfilePage},
];

const router = new VueRouter({routes});

/**
 * Navigation guards to prevent user from accessing wrong pages.
 */
router.beforeEach((to, from, next) => {
  if (router.app.$store) {
    if (to.name === 'Login' && router.app.$store.state.username) {
      next({name: 'Account'}); // Go to Account page if user navigates to Login and are signed in
      return;
    }

    if (to.name === 'Account' && !router.app.$store.state.username) {
      next({name: 'Login'}); // Go to Login page if user navigates to Account and are not signed in
      return;
    }
  }

  next();
});

export default router;
