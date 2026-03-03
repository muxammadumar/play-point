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

export type UserRole = "admin";
