import { css } from "@linaria/core";
import { spacing } from "@app/theme/spacing";

export const $titleContainer = css`
  display: flex;
  font-size: 14px;
`;

export const $title = css`
  padding-left: 2px;
`;

export const $redMark = css`
  margin-left: ${spacing.xxs};
  color: red;
`;

export const $error = css`
  color: red;
  font-size: 12px;
`;

const styles = {
  $titleContainer,
  $title,
  $redMark,
  $error,
};

export default styles;
