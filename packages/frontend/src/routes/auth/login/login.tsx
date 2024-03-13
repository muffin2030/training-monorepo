import { FC, useCallback } from "react";
import { useDispatch } from "@app/redux/store";
import { setTokens } from "@app/redux/authSlice/authSlice";
import { useLazyLoginQuery } from "@app/api/authApi/authApi";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginInner } from "@app/routes/auth/login/login-inner";
import { FormValues } from "@app/routes/auth/login/types";

type Props = {};

export const Login: FC<Props> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, queryState] = useLazyLoginQuery();

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

  return <LoginInner onSubmit={doSubmit} queryState={queryState} />;
};
