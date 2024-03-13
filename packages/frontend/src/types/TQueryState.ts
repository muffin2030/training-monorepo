// @ts-expect-error
import { UseQueryStateDefaultResult } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryDefinition,
} from "@reduxjs/toolkit/query";

export type TQueryState<
  Body,
  Response,
  ApiKey extends string,
> = UseQueryStateDefaultResult<
  QueryDefinition<
    Body,
    BaseQueryFn<
      string | FetchArgs,
      unknown,
      FetchBaseQueryError,
      {},
      FetchBaseQueryMeta
    >,
    never,
    Response,
    ApiKey
  >
>;
