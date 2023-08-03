import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'

export enum RoutePath {
  Main = '/',
  People = '/people',
  PeopleById = '/people/:id',
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
      path: RoutePath.People,
      name: 'people',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/pages/PeoplePage.vue')
    },
    {
      path: RoutePath.PeopleById,
      name: 'peoplesById',
      component: () => import('@/pages/PeoplePage.vue')
    },
    {
      path: RoutePath.Favorites,
      name: 'favorites',
      component: () => import('@/pages/FavoritesPage.vue')
    }
  ]
})

export default router
