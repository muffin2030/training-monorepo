import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiV1, apiPrefix, baseUrl } from "@app/api/variables";
import {
  LoginBody,
  LoginResponse,
  RefreshTokensBody,
} from "@app/api/authApi/types";

const API_URL = `/${apiPrefix}/${apiV1}`;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),

  endpoints: (builder) => ({
    login: builder.query<LoginResponse, LoginBody>({
      query: (body) => ({
        url: `${API_URL}/login`,
        method: "POST",
        body,
      }),
    }),
    logout: builder.query<boolean, undefined>({
      query: (body) => ({
        url: `${API_URL}/logout`,
        method: "POST",
        body,
      }),
    }),
    refreshTokens: builder.query<LoginResponse, RefreshTokensBody>({
      query: (body) => ({
        url: `${API_URL}/refresh-tokens`,
        method: "POST",
        body,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useLazyLoginQuery,
  useLazyRefreshTokensQuery,
  useLazyLogoutQuery,
} = authApi;
