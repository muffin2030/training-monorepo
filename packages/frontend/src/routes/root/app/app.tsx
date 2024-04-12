import React, { FC, Suspense, useEffect, useState } from "react";
import { RootRoute } from "@app/routes/root/root-route/root-route";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Cookies from "js-cookie";
import { logout, setTokens } from "@app/redux/authSlice/authSlice";
import { useDispatch, useSelector } from "@app/redux/store";
import { useLazyRefreshTokensQuery } from "@app/api/authApi/authApi";
import { NotFoundPage } from "@app/routes/route-not-found/not-found-page";
import { Login } from "@app/routes/auth/login/login";
import { PrivateRoute } from "@app/components/private-route/private-route";
import { $container, $fallback } from "./styles";
import { lazy } from "react";
import { resolveWithValue } from "@tm/common/lib/utils/resolve-with-value";
import { Layout } from "@app/components/layout/layout.tsx";

const MainRoute = lazy(() =>
  resolveWithValue(undefined, 1000).then(() =>
    import("@app/routes/main/main-route/main-route.tsx").then(
      ({ MainRoute }) => ({ default: MainRoute }),
    ),
  ),
);

const TodoRoute = lazy(() =>
  resolveWithValue(undefined, 1000).then(() =>
    import("@app/routes/todo/todo-route/todo-route.tsx").then(
      ({ TodoRoute }) => ({ default: TodoRoute }),
    ),
  ),
);

const Fallback: FC = () => {
  return (
    <Layout>
      <div className={$fallback}>Module is Loading...</div>
    </Layout>
  );
};

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
            <Suspense fallback={<Fallback />}>
              <MainRoute />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "todo",
        element: (
          <PrivateRoute>
            <Suspense fallback={<Fallback />}>
              <TodoRoute />
            </Suspense>
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

  const { token, refreshToken } = useSelector((state) => state.auth);
  const [isInitializing, setIsInitializing] = useState(true);

  const [doRefreshTokens, { isFetching }] = useLazyRefreshTokensQuery();

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
