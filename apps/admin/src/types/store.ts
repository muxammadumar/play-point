import type { IUser } from "./services/auth";
import type { Language } from "./common";

export interface IAuthState {
  token: string | null;
  user: IUser | null;
  isAuthenticated: boolean;
  isSessionLocked: boolean;
}

export interface ISettingsState {
  locale: Language;
  theme?: "light" | "dark" | "auto";
  notifications?: {
    enabled: boolean;
    sound: boolean;
    desktop: boolean;
  };
}

export interface INotificationState {
  notifications: INotification[];
  unreadCount: number;
  loading: boolean;
}

export interface INotification {
  id: number | string;
  type: "info" | "success" | "warning" | "error" | "appeal" | "chat" | "system";
  title: string;
  message: string;
  read: boolean;
  data?: any;
  actionUrl?: string;
  actionText?: string;
  createdAt: string;
  readAt?: string;
}

export interface IRootState {
  auth: IAuthState;
  settings: ISettingsState;
  notifications: INotificationState;
}

