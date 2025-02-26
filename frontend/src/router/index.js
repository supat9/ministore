import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/create',
      name: 'create',
      component: () => import('../views/CreateView.vue'),
    },
    {
      path: '/update/:id',
      name: 'update',
      component: () => import('../views/UpdateView.vue'),
    },
    {
      path: '/createProduct',
      name: 'createProduct',
      component: () => import('../views/CreateProductView.vue'),
    },
    {
      path: '/updateProduct/:id',
      name: 'updateProduct',
      component: () => import('../views/UpdateProductView.vue'),
    }
  ],
})

export default router
