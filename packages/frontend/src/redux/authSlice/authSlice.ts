import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { heavyCalculations } from "@app/redux/authSlice/thunks";

export type AuthSlice = {
  isAuthorized: boolean;
  token: string | null;
  refreshToken: string | null;
  backUrl: string | null;
  heavyCalcIsInProgress: boolean;
};

const initialState: AuthSlice = {
  isAuthorized: false,
  token: null,
  refreshToken: null,
  backUrl: null,
  heavyCalcIsInProgress: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokens: (
      state,
      { payload }: PayloadAction<Pick<AuthSlice, "token" | "refreshToken">>,
    ) => {
      const { token, refreshToken } = payload;

      if (token && refreshToken) {
        state.token = token;
        state.refreshToken = refreshToken;
        state.isAuthorized = true;
      }
    },
    logout: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.isAuthorized = false;
    },
    setBackUrl: (state, { payload }: PayloadAction<string | null>) => {
      state.backUrl = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(heavyCalculations.pending, (state, action) => {
      state.heavyCalcIsInProgress = true;
    });

    // handle both "fulfilled" and "rejected"
    builder.addMatcher(heavyCalculations.settled, (state, action) => {
      state.heavyCalcIsInProgress = false;
    });
  },
});

export const { setTokens, logout, setBackUrl } = authSlice.actions;
