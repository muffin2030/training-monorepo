import { css } from "@linaria/core";
import { spacing } from "@app/theme/spacing";
import { colors } from "@app/theme/colors";

export const $container = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const $form = css`
  width: 200px;
  display: flex;
  flex-direction: column;
  padding: ${spacing.sm}px ${spacing.md}px;
  border: 1px solid ${colors.border};
  border-radius: 5px;
  background: ${colors.palette.primary100};
`;

export const $marginTop = css`
  margin-top: 10px;
`;

export const $passwordInput = css`
  width: auto;
`;

export const $apiError = css`
  color: red;
  font-size: 14px;
`;

const styles = {
  $container,
  $form,
  $marginTop,
};

export default styles;
