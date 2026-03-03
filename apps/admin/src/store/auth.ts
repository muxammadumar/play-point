import { defineStore } from "pinia";
import Cookies from "js-cookie";
import { authService } from "@/services/auth";

import type {
  ILoginPayload,
  IUser,
  IForgotPasswordRequest,
  IChangePasswordRequest,
  IUpdatePasswordRequest,
  IAuthState,
} from "@/types";
import router from "@/router";

export const useAuthStore = defineStore("auth", {
  state: (): IAuthState => ({
    token: Cookies.get("akfaadmin_access_token") || null,
    user: JSON.parse(Cookies.get("akfaadmin_user") || "{}") || null,
    isAuthenticated: !!Cookies.get("akfaadmin_access_token"),
    isSessionLocked: !!Cookies.get("akfaadmin_is_idle"),
  }),
  actions: {
    lockSection() {
      this.isSessionLocked = true;
      this.isAuthenticated = false;
      Cookies.set("akfaadmin_is_idle", "true");
      router.push({ name: "IdleLock" });
    },
    unlockSection() {
      this.isSessionLocked = false;
      Cookies.remove("akfaadmin_is_idle");
      router.push({ name: "AppealsList" });
    },
    setToken(token: string) {
      this.token = token;
      Cookies.set("akfaadmin_access_token", token, { expires: 7 });
    },
    clearToken() {
      this.token = null;
      Cookies.remove("akfaadmin_access_token");
    },
    setUser(user: IUser) {
      this.user = user;
      Cookies.set("akfaadmin_user", JSON.stringify(user), { expires: 7 });
    },
    clearUser() {
      this.user = null;
      Cookies.remove("akfaadmin_user");
    },

    async login(payload: ILoginPayload) {
      try {
        const { access_token } = await authService.login(payload);
        this.isAuthenticated = true;
        this.setToken(access_token);
        this.getProfile();
        this.unlockSection();
        router.push({ name: "AppealsList" });
        return true;
      } catch (error: any) {
        console.error("Login failed:", error);
        throw error;
      }
    },

    async getProfile() {
      try {
        const user = await authService.getProfile();
        this.setUser(user);
      } catch (error) {
        console.error("Get profile failed:", error);
        throw error;
      }
    },

    async logout() {
      try {
        this.clearToken();
        this.clearUser();
        this.isAuthenticated = false;
        router.push({ name: "Login" });
      } catch (error) {
        console.warn("Logout request failed:", error);
      }
    },
    async forgotPassword(payload: IForgotPasswordRequest) {
      try {
        await authService.forgotPassword(payload);
      } catch (error) {
        console.error("Forgot password failed:", error);
        throw error;
      }
    },
    async changePassword(payload: IChangePasswordRequest) {
      try {
        await authService.changePassword(payload);
        router.push({ name: "Login" });
      } catch (error) {
        console.error("Forgot password failed:", error);
        throw error;
      }
    },

    async updatePassword(payload: IUpdatePasswordRequest) {
      try {
        await authService.updatePassword(payload);
      } catch (error) {
        console.error("Update password failed:", error);
        throw error;
      }
    },
  },
});
