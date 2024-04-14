import { RouteRecordRaw } from "vue-router";

export const noteRoutes = [
  {
    path: "notes",
    name: "notes",
    component: () => import("@/shared/views/Home.vue"),
  },
  {
    path: "notes/:id",
    name: "note-detail",
    component: () => import("@/modules/note/views/NoteView.vue"),
  },
] as RouteRecordRaw[];
