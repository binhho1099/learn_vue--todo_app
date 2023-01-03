import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: () => import('../views/Product.vue'),
    beforeEnter: (to, _, next) => {
      const { id } = to.params;

      if (Array.isArray(id)) {
        next({ path: '/error' });
        return;
      }
    },
  },
  {
    path: '/:catchAll(.*)',
    name: 'Page Not Found',
    component: () => import('../views/About.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active-class',
});

export default router;
