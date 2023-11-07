import { RouteRecordRaw } from "vue-router";

export const protectedRoutes = [
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/protected/Home.vue"),
  },
  {
    path: "/note/:id",
    name: "note",
    component: () => import("@/views/protected/NoteView.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("@/views/protected/NotFound.vue"),
  },
] as RouteRecordRaw[];
