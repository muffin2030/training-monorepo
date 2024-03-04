import { ButtonHTMLAttributes, FC, forwardRef, ReactNode } from "react";
import { $container } from "./button.styles";
import { cx } from "@linaria/core";

type Props = {
  children: ReactNode;
  variant?: "primary" | "secondary";
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      variant = "primary",
      children,
      iconLeft,
      iconRight,
      isLoading,
      className,
      ...buttonProps
    },
    ref,
  ) => {
    return (
      <button {...buttonProps} className={cx($container, className)} ref={ref}>
        {isLoading ? "loading..." : children}
      </button>
    );
  },
);
