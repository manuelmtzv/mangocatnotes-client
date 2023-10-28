import { RouteRecordRaw } from 'vue-router'

export const publicRoutes = {
  path: '/',
  name: 'home',
  component: () => import('@/views/Welcome.vue'),
} as RouteRecordRaw
