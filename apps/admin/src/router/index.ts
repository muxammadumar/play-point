import {
  type RouteRecordRaw,
  createRouter,
  createWebHistory,
} from "vue-router";

import AuthLayout from "@/layout/auth.vue";
import SupportLayout from "@/layout/support.vue";

import LoginView from "@/views/auth/Login.vue";
import IdleLockView from "@/views/auth/IdleLock.vue";
import ForgotPasswordView from "@/views/auth/ForgotPassword.vue";
import ChangePasswordView from "@/views/auth/ChangePassword.vue";

import Settings from "@/views/Settings.vue";
import Profile from "@/views/Profile.vue";

import {
  authMiddleware,
  guestMiddleware,
  idleLockMiddleware,
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
      {
        path: "idle-lock",
        name: "IdleLock",
        component: IdleLockView,
        // meta: { middleware: [guestMiddleware] },
      },
      {
        path: "forgot-password",
        name: "ForgotPassword",
        component: ForgotPasswordView,
        meta: { middleware: [guestMiddleware] },
      },
      {
        path: "change-password",
        name: "ChangePassword",
        component: ChangePasswordView,
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
      middleware: [authMiddleware, idleLockMiddleware],
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
