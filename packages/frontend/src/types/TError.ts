import { FieldError } from "react-hook-form";

export type TError<FormValues> = Partial<
  Record<keyof FormValues, FieldError | undefined>
>;
