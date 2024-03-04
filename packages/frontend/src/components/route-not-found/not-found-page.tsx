import React, { FC } from "react";
import { Link, useRouteError } from "react-router-dom";
import { RouteError } from "@app/types/RouteError";
import { Layout } from "@app/components/layout/layout";
import { $container, $layout } from "./styles";

export const NotFoundPage: FC = () => {
  const error = useRouteError() as RouteError;

  return (
    <Layout className={$layout}>
      <div className={$container}>
        <div>Page not found</div>
        {error && <div>{error.data}</div>}
        <div>
          <Link to="/">go to main page</Link>
        </div>
      </div>
    </Layout>
  );
};
