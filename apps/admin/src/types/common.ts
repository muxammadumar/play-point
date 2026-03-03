export interface IApiError {
  message: string;
  error: string;
  statusCode: number;
}

export interface BaseEntity {
  id: string | number;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export type Status = "active" | "inactive" | "pending";

export type Language = "en" | "ru" | "uz";
