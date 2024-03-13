import { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { AllProviders } from "../components/all-providers/AllProviders";

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: AllProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
