import React, { FC, PropsWithChildren } from "react";
import { ErrorBoundary } from "../error-boundary/error-boundary";
import { Provider } from "react-redux";
import { store } from "@app/redux/store";

export const AllProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <ErrorBoundary>{children}</ErrorBoundary>
      </Provider>
    </React.StrictMode>
  );
};
