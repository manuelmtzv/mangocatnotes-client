import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteLocationRaw,
  RouteRecordRaw,
} from 'vue-router'
import { authRoutes, publicRoutes, protectedRoutes } from '@/routes'
import { useTokenValidation } from '@/composables/useTokenValidation'
import { IAuthResponse } from '@/interfaces/auth'

const routes = [
  {
    path: '',
    component: () => import('@/layouts/Layout.vue'),
    meta: {
      authRequired: false,
    },
    children: [...publicRoutes, ...authRoutes],
  },

  {
    path: '',
    component: () => import('@/layouts/Layout.vue'),
    meta: {
      authRequired: true,
    },
    children: [...protectedRoutes],
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/protected/NotFound.vue'),
  },
] as RouteRecordRaw[]

const router = createRouter({
  routes,
  history: createWebHistory(),
})

const handleRootNavigation = (
  to: RouteLocationNormalized,
  next: NavigationGuardNext,
  redirect: RouteLocationRaw
) => {
  to.path === '/' ? next(redirect) : next()
}

router.beforeEach(async (to, from, next) => {
  const { validateToken, jwt } = useTokenValidation()
  const authRequired = to.matched.some((route) => route.meta.authRequired)
  let authenticated: void | IAuthResponse

  if (authRequired) {
    authenticated = await validateToken()
    authenticated
      ? handleRootNavigation(to, next, { name: 'home' })
      : next({ name: 'welcome' })
  } else {
    jwt.value
      ? (authenticated = await validateToken())
      : (authenticated = undefined)

    authenticated
      ? next({ name: from?.name || 'home' })
      : handleRootNavigation(to, next, { name: 'welcome' })
  }
})

export default router
