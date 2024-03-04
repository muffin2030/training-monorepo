import { FieldError, FieldValues, Resolver } from "react-hook-form";

type TValidationFn<T> = (
  values: T,
) => Partial<Record<keyof T, FieldError | undefined>>;

export const getSimpleResolver =
  <T extends FieldValues>(validationFn: TValidationFn<T>): Resolver<T> =>
  async (values) => {
    return {
      values,
      errors: validationFn(values),
    };
  };
