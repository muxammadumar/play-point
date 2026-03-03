// Utility types

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type Maybe<T> = T | null | undefined;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

export type ValueOf<T> = T[keyof T];

export type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

export type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

export interface ITimestamps {
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface ISoftDelete {
  isDeleted: boolean;
  deletedAt: string | null;
  deletedBy: string | null;
}

export interface IMetadata {
  [key: string]: any;
}

export interface ICoordinates {
  latitude: number;
  longitude: number;
}

export interface IAddress {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  coordinates?: ICoordinates;
}

export interface IFileUpload {
  file: File;
  url?: string;
  progress?: number;
  status: "pending" | "uploading" | "success" | "error";
  error?: string;
}

export interface IDateRange {
  start: string | Date;
  end: string | Date;
}

export interface ISearchParams {
  query: string;
  filters?: Record<string, any>;
  sort?: string;
  order?: "asc" | "desc";
  page?: number;
  limit?: number;
}

export interface ISortConfig {
  key: string;
  order: "asc" | "desc";
}

