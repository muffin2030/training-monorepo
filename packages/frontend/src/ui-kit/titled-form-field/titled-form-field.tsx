import React, { FC, PropsWithChildren } from "react";
import { $error, $redMark, $title, $titleContainer } from "./styles";

type Props = PropsWithChildren & {
  required?: boolean;
  title?: string;
  error?: string | undefined;
  className?: string;
};

export const TitledFormField: FC<Props> = ({
  title,
  error,
  className,
  required,
  children,
}) => {
  return (
    <div className={className}>
      <div className={$titleContainer}>
        <div className={$title}>{title}</div>
        <div>:</div>
        {required && <div className={$redMark}>*</div>}
      </div>
      <div>{children}</div>
      {!!error && <div className={$error}>{error}</div>}
    </div>
  );
};
