import React, { FC, PropsWithChildren } from "react";
import { Header } from "./header";
import { $contentContainer, $layoutContainer } from "./styles";
import { cx } from "@linaria/core";

type Props = PropsWithChildren & {
  className?: string;
};

export const Layout: FC<Props> = ({ className, children }) => {
  return (
    <div className={$layoutContainer}>
      <Header />
      <div className={cx($contentContainer, className)}>{children}</div>
    </div>
  );
};
