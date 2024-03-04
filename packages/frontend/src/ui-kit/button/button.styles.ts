import { css } from "@linaria/core";
import { colors } from "@app/theme/colors";
import { spacing } from "@app/theme/spacing";

export const $container = css`
  vertical-align: center;
  color: ${colors.palette.neutral200};
  padding: ${spacing.xs}px ${spacing.sm}px;
  background: ${colors.palette.primary400};
  border: 1px solid ${colors.border};
  border-radius: 5px;
  transition: all ease-in-out 200ms;

  &:hover {
    background: ${colors.tint};
  }
`;

const styles = {
  $container,
};

export default styles;
