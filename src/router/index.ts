import { ElMessage } from 'element-plus';
import {
  createRouter,
  createWebHistory,
} from 'vue-router';

import { getAuth } from '@/utils/auth';
import Home from '@/views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {requiresAuth: true},
  },
  {
    path: '/articles',
    name: 'articles',
    component: () =>
      import(/* webpackChunkName: "articles" */ '../views/Articles.vue'),
  },
  {
    path: '/archive',
    name: 'archive',
    component: () =>
      import(/* webpackChunkName: "archive" */ '../views/Archive.vue'),
  },
  {
    path: '/timeline',
    name: 'timeline',
    component: () =>
      import(/* webpackChunkName: "timeline" */ '../views/Timeline.vue'),
  },
  {
    path: '/project',
    name: 'project',
    component: () =>
      import(/* webpackChunkName: "project" */ '../views/Project.vue'),
  },
  {
    path: '/message',
    name: 'message',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Message.vue'),
  },
  {
    path: '/chat',
    name: 'chat',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Chat.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = [
    '/articles',
    '/archive',
    '/timeline',
    '/project',
    '/message',
    '/about',
    '/chat',
  ];
  const Auth = getAuth();
  console.log(Auth);
  if (auth.includes(to.fullPath)) {
    if (!Auth) {
      ElMessage({message: '请先登录', type: 'warning'});
      router.push('/');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
