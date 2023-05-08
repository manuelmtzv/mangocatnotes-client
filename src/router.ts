import { createRouter, createWebHashHistory } from 'vue-router'

// Layout
import Layout from './layouts/Layout.vue'

// Views
import Home from './views/Home.vue'

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'home',
        component: Home,
      },
    ],
  },
]

const router = createRouter({
  routes,
  history: createWebHashHistory(),
})

export default router
