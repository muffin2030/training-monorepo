import { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import {
  $input,
  $inputContainer,
  $iconRightContainer,
  $pointer,
} from "./input.styles";
import { TitledFormField } from "@app/ui-kit/titled-form-field/titled-form-field";
import { cx } from "@linaria/core";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  title: string;
  error?: string | undefined;
  required?: boolean;
  IconRight?: ReactNode;
  onIconClick?: () => void;
};

export const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      title,
      error,
      className,
      IconRight,
      required = false,
      onIconClick,
      ...props
    },
    ref,
  ) => {
    return (
      <TitledFormField
        title={title}
        error={error}
        required={required}
        className={className}
      >
        <div className={$inputContainer}>
          <input {...props} ref={ref} className={$input} />
          {!!IconRight && (
            <div
              className={cx($iconRightContainer, onIconClick && $pointer)}
              onClick={onIconClick}
            >
              {IconRight}
            </div>
          )}
        </div>
      </TitledFormField>
    );
  },
);
