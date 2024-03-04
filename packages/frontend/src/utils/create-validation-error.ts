import { FieldError } from "react-hook-form";

export const createValidationError = (message: string): FieldError => ({
  type: "manual",
  message,
});
