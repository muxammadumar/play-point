import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import type { useAuthStore } from "@/store/auth";
import type { Middleware } from "@/types";

export type { Middleware };

type AuthStore = ReturnType<typeof useAuthStore>;

let authStore: AuthStore;

export const initAuthStore = (store: AuthStore) => {
  authStore = store;
};

export const authMiddleware: Middleware = (to, from, next) => {
  const isAuthenticated = authStore.isAuthenticated;
  if (to.path.startsWith("/auth")) {
    return next();
  }
  if (!isAuthenticated) {
    return next({ path: "/auth/login", replace: true });
  }

  next();
};

export const guestMiddleware: Middleware = (to, from, next) => {
  const isAuthenticated = authStore.isAuthenticated;

  if (isAuthenticated && to.path.startsWith("/auth")) {
    return next({ name: "Profile", replace: true });
  }

  next();
};

export const roleMiddleware = (allowedRoles: string[]): Middleware => {
  return (to, from, next) => {
    const userRole = authStore.user?.role;

    if (!userRole || !allowedRoles.includes(userRole)) {
      next({ name: "Profile" });
    } else {
      next();
    }
  };
};

export const idleLockMiddleware: Middleware = (to, from, next) => {
  const isLocked = authStore.isSessionLocked;

  if (isLocked && to.name !== "IdleLock") {
    next({ name: "IdleLock" });
  } else if (!isLocked && to.name === "IdleLock") {
    next({ name: "Profile" });
  } else {
    next();
  }
};

export const permissionMiddleware = (permission: string): Middleware => {
  return (to, from, next) => {
    const role = authStore.user?.role;

    if (role !== permission) {
      next({ name: "Profile" });
    } else {
      next();
    }
  };
};

export const middlewarePipeline = (
  context: {
    to: RouteLocationNormalized;
    from: RouteLocationNormalized;
    next: NavigationGuardNext;
  },
  middlewares: Middleware[],
  index: number = 0
): void => {
  const middleware = middlewares[index];

  if (!middleware) {
    return context.next();
  }

  let nextCalled = false;
  const nextMiddleware: NavigationGuardNext = (params?: any) => {
    if (nextCalled) {
      return;
    }
    nextCalled = true;

    if (params !== undefined) {
      return context.next(params);
    }

    middlewarePipeline(context, middlewares, index + 1);
  };

  middleware(context.to, context.from, nextMiddleware);
};
