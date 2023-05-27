import { createRouter, createWebHashHistory } from 'vue-router'

// Layout
import Layout from './layouts/Layout.vue'

// Views
import Home from './views/Home.vue'
import NoteView from './views/NoteView.vue'
import NotFound from './views/NotFound.vue'

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
      {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFound,
      },
    ],
  },
]

const router = createRouter({
  routes,
  history: createWebHashHistory(),
})

export default router
