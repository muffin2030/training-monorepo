import React from "react";
import { createRoot } from "react-dom/client";
import { AllProviders } from "@app/components/all-providers/AllProviders";
import { App } from "@app/routes/root/app/app";

export const init = (rootElement: HTMLElement) => {
  const root = createRoot(rootElement);

  root.render(
    <AllProviders>
      <App />
    </AllProviders>,
  );
};

export default init;
