import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/Classes',
      name: 'Classes',
      component: () => import('../views/Classes.vue')
    },
    {
      path: '/Teachers',
      name: 'TeachersAndStudents',
      component: () => import('../views/Teachers.vue')
    },
    {
      path: '/Subjects',
      name: 'Subjects',
      component: () => import('../views/Subjects.vue')
    },
    {
      path: '/Subjects/:subjectData'
    },
    {
      path: '/Export',
      name: 'Export',
      component: () => import('../views/Export.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
