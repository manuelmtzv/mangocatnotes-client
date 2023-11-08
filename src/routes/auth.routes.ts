import { RouteRecordRaw } from "vue-router";

export const authRoutes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/auth/Login.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/auth/Register.vue"),
  },
] as RouteRecordRaw[];
