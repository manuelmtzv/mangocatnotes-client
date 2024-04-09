import { RouteRecordRaw } from "vue-router";

export const noteRoutes = [
  {
    path: "/home",
    name: "home",
    component: () => import("@/shared/views/Home.vue"),
  },
  {
    path: "/note/:id",
    name: "note",
    component: () => import("@/modules/note/views/NoteView.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("@/shared/views/NotFound.vue"),
  },
] as RouteRecordRaw[];
