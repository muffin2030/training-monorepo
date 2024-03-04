import React, { FC, useCallback } from "react";
import { Link, LinkProps, useLocation } from "react-router-dom";
import {
  $active,
  $buttonContainer,
  $container,
  $headerLink,
  $links,
  $logout,
} from "./styles";
import { cx } from "@linaria/core";
import { Button } from "@app/ui-kit/button/button";
import { logout } from "@app/redux/authSlice/authSlice";
import { useLazyLogoutQuery } from "@app/api/authApi/authApi";
import { useDispatch } from "@app/redux/store";

export const Header: FC = () => {
  const dispatch = useDispatch();
  const [doLogout, { isFetching }] = useLazyLogoutQuery();

  const handleLogout = useCallback(async () => {
    doLogout(undefined).finally(() => dispatch(logout()));
  }, [doLogout, dispatch]);

  return (
    <div className={$container}>
      <div className={$links}>
        <HeaderLink to="/main">Home</HeaderLink>
        <HeaderLink to="/todo">TODO list</HeaderLink>
        <HeaderLink to="/404">404</HeaderLink>
      </div>

      <div className={$buttonContainer}>
        <Button
          onClick={handleLogout}
          isLoading={isFetching}
          className={$logout}
        >
          logout
        </Button>
      </div>
    </div>
  );
};

type HeaderProps = LinkProps & {
  to: string;
};

const HeaderLink: FC<HeaderProps> = ({ className, to, ...props }) => {
  const { pathname } = useLocation();
  const isActive = to.includes(pathname);

  return (
    <Link
      {...props}
      to={to}
      className={cx($headerLink, isActive && $active, className)}
    />
  );
};
