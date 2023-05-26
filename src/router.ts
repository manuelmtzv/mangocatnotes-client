import { createRouter, createWebHashHistory } from 'vue-router'

// Layout
import Layout from './layouts/Layout.vue'

// Views
import Home from './views/Home.vue'
import NoteView from './views/NoteView.vue'

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
      {
        path: '/note/:id',
        name: 'note',
        component: NoteView,
      },
    ],
  },
]

const router = createRouter({
  routes,
  history: createWebHashHistory(),
})

export default router
