import type {
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordName,
} from "vue-router";

export type Middleware = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => void | Promise<void>;

export interface IRouteContext {
  to: RouteLocationNormalized;
  from: RouteLocationNormalized;
  next: NavigationGuardNext;
}

export interface IRouteMeta {
  middleware?: Middleware[];
  activeMenu?: string | RouteRecordName;
  requiresAuth?: boolean;
  requiredRole?: string | string[];
  title?: string;
  breadcrumb?: string[];
}

export interface INavigationState {
  isNavigating: boolean;
  from?: RouteLocationNormalized;
  to?: RouteLocationNormalized;
  error?: Error;
}

