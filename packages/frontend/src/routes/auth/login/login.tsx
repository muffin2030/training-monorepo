import { FC, useCallback, useState } from "react";
import { Button } from "@app/ui-kit/button/button";
import { useDispatch } from "@app/redux/store";
import { setTokens } from "@app/redux/authSlice/authSlice";
import { useLazyLoginQuery } from "@app/api/authApi/authApi";
import { ApiError } from "@app/types/ApiError";
import { useNavigate } from "react-router-dom";
import {
  $apiError,
  $container,
  $form,
  $marginTop,
  $passwordInput,
} from "./login.styles";
import { consts } from "@tm/common";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@app/ui-kit/input/input";
import { getSimpleResolver } from "@app/utils/get-simple-resolver";
import { validate } from "./validation";
const { validEmail, validPassword } = consts;
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { cx } from "@linaria/core";

type Props = {};

export type FormValues = {
  email: string;
  password: string;
};

const defaultValues: FormValues = {
  email: validEmail,
  password: validPassword,
};

export const Login: FC<Props> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [hidePassword, setHidePassword] = useState<boolean>(true);

  const [login, { data, error: rawError, isFetching }] = useLazyLoginQuery();
  const apiError = rawError as ApiError;

  const IconComponent = hidePassword ? MdVisibility : MdVisibilityOff;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<FormValues>>({
    defaultValues,
    resolver: getSimpleResolver(validate),
    mode: "onTouched",
  });

  const doSubmit: SubmitHandler<FormValues> = useCallback(
    async ({ email, password }) => {
      const { data } = await login({
        email,
        password,
      });

      if (data) {
        await dispatch(setTokens(data));
        navigate("/");
      }
    },
    [login, navigate],
  );

  const handleChangePwdVisibility = useCallback(() => {
    setHidePassword((prev) => !prev);
  }, []);

  return (
    <div className={$container}>
      <form onSubmit={handleSubmit(doSubmit)} className={$form}>
        <Input
          type="text"
          title="E-mail"
          required
          error={errors.email?.message}
          {...register("email")}
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
        />

        {apiError && (
          <div className={cx($apiError, $marginTop)}>
            {apiError.data.message}
          </div>
        )}

        <Button type="submit" isLoading={isFetching} className={$marginTop}>
          login
        </Button>
      </form>
    </div>
  );
};
