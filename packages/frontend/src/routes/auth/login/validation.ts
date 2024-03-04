import { TError } from "@app/types/TError";
import { createValidationError } from "@app/utils/create-validation-error";
import { FormValues } from "./login";

let emailRegExp =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const validate = (values: Partial<FormValues>) => {
  const errors: TError<FormValues> = {};

  if (!values.email) {
    errors.email = createValidationError("email is required");
  } else if (!emailRegExp.test(values.email)) {
    errors.email = createValidationError("invalid email");
  }

  if (!values.password) {
    errors.password = createValidationError("password is required");
  }

  return errors;
};
