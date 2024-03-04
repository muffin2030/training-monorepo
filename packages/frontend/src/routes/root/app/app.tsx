import React, { FC, useEffect, useState } from "react";
import { RootRoute } from "@app/routes/root/root-route/root-route";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import Cookies from "js-cookie";
import { logout, setTokens } from "@app/redux/authSlice/authSlice";
import { useDispatch, useSelector } from "@app/redux/store";
import { useLazyRefreshTokensQuery } from "@app/api/authApi/authApi";
import { NotFoundPage } from "@app/components/route-not-found/not-found-page";
import { Login } from "@app/routes/auth/login/login";
import { MainRoute } from "@app/routes/main/main-route/main-route";
import { PrivateRoute } from "@app/components/private-route/private-route";
import { $container } from "./styles";
import { TodoRoute } from "@app/routes/todo/todo-route/todo-route";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: (
      <PrivateRoute>
        <NotFoundPage />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <RootRoute />
          </PrivateRoute>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "main",
        element: (
          <PrivateRoute>
            <MainRoute />
          </PrivateRoute>
        ),
      },
      {
        path: "todo",
        element: (
          <PrivateRoute>
            <TodoRoute />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

const setCookies = (token: string | null, refreshToken: string | null) => {
  if (!token && !refreshToken) {
    Cookies.remove("token");
    Cookies.remove("refreshToken");
  } else if (!!token && !!refreshToken) {
    Cookies.set("token", token, {
      path: "/",
      secure: true,
      sameSite: "Strict",
    });
    Cookies.set("refreshToken", refreshToken, {
      path: "/",
      secure: true,
      sameSite: "Strict",
    });
  }
};

export const App: FC = () => {
  const dispatch = useDispatch();

  const { token, refreshToken, isAuthorized } = useSelector(
    (state) => state.auth,
  );
  const [isInitializing, setIsInitializing] = useState(true);

  const [doRefreshTokens, { isFetching, data }] = useLazyRefreshTokensQuery();

  useEffect(() => {
    if (!isInitializing) {
      setCookies(token, refreshToken);
    }
  }, [isInitializing, token, refreshToken]);

  useEffect(() => {
    const asyncFn = async () => {
      const token = Cookies.get("token");
      const refreshToken = Cookies.get("refreshToken");

      if (token && refreshToken) {
        const { data } = await doRefreshTokens({
          refreshToken,
        });

        if (data) {
          await dispatch(setTokens({ token, refreshToken }));
        } else {
          await dispatch(logout());
        }
      }

      setIsInitializing(false);
    };

    void asyncFn();
  }, [setIsInitializing]);

  if (isInitializing || isFetching) {
    return (
      <div className={$container}>
        <div>Loading...</div>
      </div>
    );
  }

  return <RouterProvider router={router} />;
};
