export type ApiErrorData = {
  message: string;
};

export type ApiError =
  | {
      status: number;
      data: ApiErrorData;
    }
  | undefined;
