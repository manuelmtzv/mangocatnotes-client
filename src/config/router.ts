import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteLocationRaw,
  RouteRecordRaw,
} from "vue-router";
import { authRoutes, publicRoutes, protectedRoutes } from "@/routes";
import { useTokenValidation } from "@/composables/auth/useTokenValidation";
import { IAuthResponse } from "@/interfaces/auth";
import { useLoading } from "vue-loading-overlay";

const routes = [
  {
    path: "",
    component: () => import("@/layouts/Layout.vue"),
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
    component: () => import("@/layouts/Layout.vue"),
    children: [
      {
        path: "",
        name: "not-found",
        component: () => import("@/views/public/NotFound.vue"),
      },
    ],
  },
] as RouteRecordRaw[];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

const handleRootNavigation = (
  to: RouteLocationNormalized,
  next: NavigationGuardNext,
  redirect: RouteLocationRaw,
) => {
  to.path === "/" ? next(redirect) : next();
};

router.beforeEach(async (to, from, next) => {
  const loading = useLoading().show();
  const { validateToken, jwt } = useTokenValidation();
  const authRequired = to.matched.some((route) => route.meta.authRequired);
  let authenticated: void | IAuthResponse;

  if (authRequired) {
    authenticated = await validateToken();
    loading.hide();

    console.log(authenticated);

    authenticated
      ? handleRootNavigation(to, next, { name: "home" })
      : next({ name: "welcome" });
  } else {
    jwt.value
      ? (authenticated = await validateToken())
      : (authenticated = undefined);
    loading.hide();

    authenticated
      ? next({ name: from?.name || "home" })
      : handleRootNavigation(to, next, { name: "welcome" });
  }
});

export default router;
