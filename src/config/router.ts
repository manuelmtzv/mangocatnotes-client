import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteLocationRaw,
  RouteRecordRaw,
} from "vue-router";
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

  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("@/views/protected/NotFound.vue"),
  },
] as RouteRecordRaw[];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

const handleRootNavigation = (
  to: RouteLocationNormalized,
  next: NavigationGuardNext,
  redirect: RouteLocationRaw
) => {
  to.path === "/" ? next(redirect) : next();
};

router.beforeEach((to, from, next) => {
  const authenticated = localStorage.getItem("token");

  if (to.matched.some((route) => route.meta.authRequired)) {
    authenticated
      ? handleRootNavigation(to, next, { name: "home" })
      : next({ name: "welcome" });
  } else {
    console.log(from);
    authenticated
      ? next({ name: from?.name || "home" })
      : handleRootNavigation(to, next, { name: "welcome" });
  }
});

export default router;
