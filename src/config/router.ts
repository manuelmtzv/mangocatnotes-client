import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { authRoutes, publicRoutes, protectedRoutes } from "@/routes";

const routes = [
  {
    path: "",
    meta: {
      authRequired: false,
    },
    children: [...publicRoutes, ...authRoutes],
  },

  {
    path: "",
    component: () => import("@/layouts/Layout.vue"),
    meta: {
      authRequired: true,
    },
    children: [...protectedRoutes],
  },
] as RouteRecordRaw[];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

router.beforeEach((to, from, next) => {
  const authenticated = localStorage.getItem("token");

  if (to.matched.some((route) => route.meta.authRequired)) {
    authenticated ? next() : next({ name: "welcome" });
  } else {
    authenticated ? next({ name: from?.name || "home" }) : next();
  }
});

export default router;
