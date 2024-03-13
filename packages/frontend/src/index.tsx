import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "@app/routes/root/app/app";
import { AllProviders } from "@app/components/all-providers/AllProviders";

const rootElement = document.getElementById("root") as HTMLElement;
const root = createRoot(rootElement);

root.render(
  <AllProviders>
    <App />
  </AllProviders>,
);
