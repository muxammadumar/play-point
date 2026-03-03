import { defineStore } from "pinia";
import Cookies from "js-cookie";
import { authService } from "@/services/auth";

import type {
  ILoginPayload,
  IUser,
  IAuthState,
} from "@/types";
import router from "@/router";

export const useAuthStore = defineStore("auth", {
  state: (): IAuthState => ({
    token: Cookies.get("akfaadmin_access_token") || null,
    user: JSON.parse(Cookies.get("akfaadmin_user") || "{}") || null,
    isAuthenticated: !!Cookies.get("akfaadmin_access_token"),
    isSessionLocked: false,
  }),
  actions: {
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
        router.push({ name: "Profile" });
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
  },
});
