import { RouteRecordRaw } from "vue-router";

export const publicRoutes = [
  {
    path: "/welcome",
    name: "welcome",
    component: () => import("@/views/public/Welcome.vue"),
  },
] as RouteRecordRaw[];
