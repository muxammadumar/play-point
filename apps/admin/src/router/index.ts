import {
  type RouteRecordRaw,
  createRouter,
  createWebHistory,
} from "vue-router";

import AuthLayout from "@/layout/auth.vue";
import SupportLayout from "@/layout/support.vue";

import LoginView from "@/views/auth/Login.vue";

import Settings from "@/views/Settings.vue";
import Profile from "@/views/Profile.vue";

import {
  authMiddleware,
  guestMiddleware,
  middlewarePipeline,
  initAuthStore,
  type Middleware,
} from "@/router/middleware";

import { useAuthStore } from "@/store/auth";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/support/profile",
  },
  {
    path: "/auth",
    name: "authLayout",
    component: AuthLayout,
    redirect: "/auth/login",
    children: [
      {
        path: "login",
        name: "Login",
        component: LoginView,
        meta: { middleware: [guestMiddleware] },
      },
    ],
  },
  {
    path: "/support",
    name: "supportLayout",
    component: SupportLayout,
    redirect: "/support/profile",
    meta: {
      middleware: [authMiddleware],
    },
    children: [
      {
        path: "settings",
        name: "Settings",
        component: Settings,
        meta: {
          activeMenu: "Settings",
        },
      },
      {
        path: "profile",
        name: "Profile",
        component: Profile,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  initAuthStore(useAuthStore());
  const middlewares = (to.meta.middleware as Middleware[]) || [];

  if (!middlewares.length) {
    return next();
  }

  const context = { to, from, next };
  return middlewarePipeline(context, middlewares);
});

router.onError((error) => {
  console.error("Router error:", error);
});

export default router;
