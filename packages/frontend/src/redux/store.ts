import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice/authSlice";
import {
  TypedUseSelectorHook,
  useDispatch as useDispatchLib,
  useSelector as useSelectorLib,
} from "react-redux";
import { authApi } from "@app/api/authApi/authApi";
import { todoSlice } from "@app/redux/todoSlice/todoSlice";

export const store = configureStore({
  reducer: {
    [authSlice.reducerPath]: authSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [todoSlice.reducerPath]: todoSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([authApi.middleware]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = useDispatchLib;
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorLib;
