import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@app/components/layout/layout";
import { $container, $layout } from "./styles";

export const MainRoute: FC = () => {
  return (
    <Layout className={$layout}>
      <div className={$container}>
        <div>main route</div>
        <div>
          <Link to="/">to the root page</Link>
        </div>
      </div>
    </Layout>
  );
};
