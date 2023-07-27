import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'

export enum RoutePath {
  Main = '/',
  Peoples = '/peoples',
  PeoplesById = '/peoples/:id',
  Favorites = '/favorites'
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: RoutePath.Main,
      name: 'main',
      component: HomePage
    },
    {
      path: RoutePath.Peoples,
      name: 'peoples',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/pages/PeoplesPage.vue')
    },
    {
      path: RoutePath.PeoplesById,
      name: 'peoplesById',
      component: () => import('@/pages/PeoplesPage.vue')
    },
    {
      path: RoutePath.Favorites,
      name: 'favorites',
      component: () => import('@/pages/FavoritesPage.vue')
    }
  ]
})

export default router
