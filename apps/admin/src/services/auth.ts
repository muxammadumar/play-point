import api from "@/plugins/axios";

import type {
  ILoginPayload,
  ILoginResponse,
  IForgotPasswordRequest,
  IChangePasswordRequest,
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

  async forgotPassword(payload: IForgotPasswordRequest) {
    const { data } = await api.post(
      "/auth-admin/forgot-password",
      payload
    );
    return data;
  },

  async changePassword(payload: IChangePasswordRequest) {
    const { data } = await api.post(
      "/auth-admin/change-password",
      payload
    );
    return data;
  },

  async updatePassword(payload: { oldPassword: string; newPassword: string }) {
    const { data } = await api.post(
      "/auth-admin/update-password",
      payload
    );
    return data;
  },

  async getProfile() {
    const { data } = await api.get<IUser>("/auth-admin/get-user");
    return data;
  },
};
