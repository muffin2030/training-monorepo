import { TError } from "@app/types/TError";
import { createValidationError } from "@app/utils/create-validation-error";
import { FormValues } from "@app/routes/auth/login/types";

let emailRegExp =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const loginErrors = {
  emailRequired: "email is required",
  invalidEmail: "invalid email",
  passwordRequired: "password is required",
  passwordLength: "password should be 6 symbols or more",
};
export const validate = (values: Partial<FormValues>) => {
  const errors: TError<FormValues> = {};

  if (!values.email) {
    errors.email = createValidationError(loginErrors.emailRequired);
  } else if (!emailRegExp.test(values.email)) {
    errors.email = createValidationError(loginErrors.invalidEmail);
  }

  if (!values.password) {
    errors.password = createValidationError(loginErrors.passwordRequired);
  } else if (values.password.length < 6) {
    errors.password = createValidationError(loginErrors.passwordLength);
  }

  return errors;
};
