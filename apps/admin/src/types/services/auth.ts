export interface ILoginPayload {
  email: string;
  password: string;
}

export interface ILoginResponse {
  access_token: string;
  user: IUser;
}

export interface IUser {
  id: string;
  email: string;
  fullName: string;
  createdAt: string;
  updatedAt: string | null;
  isBlocked: boolean;
  blockedAt: string | null;
  blockedBy: string | null;
  isDeleted: boolean;
  deletedAt: string | null;
  role: UserRole;
}

export interface IForgotPasswordRequest {
  email: string;
}

export type UserRole = "support";
// export type UserRole = "admin" | "moderator" | "user";

export interface IChangePasswordRequest {
  password: string;
  token: string;
}
export interface IUpdatePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

