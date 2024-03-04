import { ErrorBoundary } from "./components/error-boundary/error-boundary";
import React from "react";
import { createRoot } from "react-dom/client";
import { store } from "@app/redux/store";
import { App } from "@app/routes/root/app/app";
import { Provider } from "react-redux";

const rootElement = document.getElementById("root") as HTMLElement;

const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>,
);
