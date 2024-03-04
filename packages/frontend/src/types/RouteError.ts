export type RouteError = {
  data: string;
  status: number;
  statusText: string;
  internal: boolean;
  error: Record<string, unknown>;
};
