import { RouteRecordRaw } from 'vue-router'

export const publicRoutes = [
  {
    path: "/welcome",
    name: "welcome",
    component: () => import("@/views/Welcome.vue"),
  },
] as RouteRecordRaw[];
