import api from "@/plugins/axios";

import type {
  ILoginPayload,
  ILoginResponse,
  IUser,
} from "@/types/services/auth";

export const authService = {
  async login(payload: ILoginPayload) {
    const { data } = await api.post<ILoginResponse>(
      "/auth-admin/login",
      payload
    );
    return data;
  },

  async getProfile() {
    const { data } = await api.get<IUser>("/auth-admin/get-user");
    return data;
  },
};
