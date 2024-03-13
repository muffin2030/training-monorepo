import { FC, useCallback, useState } from "react";
import { Button } from "@app/ui-kit/button/button";
import { ApiError } from "@app/types/ApiError";
import {
  $apiError,
  $container,
  $form,
  $marginTop,
  $passwordInput,
} from "./login.styles";
import { consts } from "@tm/common";
import { useForm } from "react-hook-form";
import { Input } from "@app/ui-kit/input/input";
import { getSimpleResolver } from "@app/utils/get-simple-resolver";
import { validate } from "./validation";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { cx } from "@linaria/core";
import { LoginBody, LoginResponse } from "@app/api/authApi/types";
import { FormValues } from "@app/routes/auth/login/types";
import { TQueryState } from "@app/types/TQueryState";

type Props = {
  queryState: TQueryState<LoginBody, LoginResponse, "authApi">;
  onSubmit: (values: FormValues) => void;
};

const { validEmail, validPassword } = consts;

const defaultValues: FormValues = {
  email: validEmail,
  password: validPassword,
};

export const LoginInner: FC<Props> = ({ onSubmit, queryState }) => {
  const [hidePassword, setHidePassword] = useState<boolean>(true);

  const { error: rawError, isFetching } = queryState;
  const apiError = rawError as ApiError;

  const IconComponent = hidePassword ? MdVisibility : MdVisibilityOff;

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<Partial<FormValues>>({
    defaultValues,
    resolver: getSimpleResolver(validate),
    mode: "onTouched",
  });

  const handleChangePwdVisibility = useCallback(() => {
    setHidePassword((prev) => !prev);
  }, []);

  return (
    <div className={$container}>
      <form onSubmit={handleSubmit(onSubmit)} className={$form}>
        <Input
          type="text"
          title="E-mail"
          required
          error={errors.email?.message}
          {...register("email")}
          data-testid="email"
        />
        <Input
          type={hidePassword ? "password" : "text"}
          title="Password"
          required
          error={errors.password?.message}
          {...register("password")}
          className={cx($passwordInput, $marginTop)}
          IconRight={<IconComponent />}
          onIconClick={handleChangePwdVisibility}
          data-testid="password"
        />

        {apiError && (
          <div className={cx($apiError, $marginTop)}>
            {apiError.data.message}
          </div>
        )}

        <Button
          type="submit"
          isLoading={isFetching}
          className={$marginTop}
          data-testid="loginButton"
        >
          login
        </Button>
      </form>
    </div>
  );
};
