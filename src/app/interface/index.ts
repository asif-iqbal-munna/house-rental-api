export interface IApiResponse<T> {
  statusCode?: number;
  success: boolean;
  message: string;
  data?: T;
  error?: unknown;
  stack?: unknown;
}

export type TQuery = Record<string, unknown>;
