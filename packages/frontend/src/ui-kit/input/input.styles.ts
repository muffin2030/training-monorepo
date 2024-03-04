import { css } from "@linaria/core";
import { colors } from "@app/theme/colors";

export const $container = css`
  background: ${colors.transparent};

  &:active {
    border: none;
  }
`;

export const $input = css`
  width: calc(100% - 8px);

  &:active {
    background: ${colors.background};
  }
`;

export const $inputContainer = css`
  position: relative;
`;

export const $iconRightContainer = css`
  position: absolute;
  right: 8px;
  top: 3px;
`;

export const $pointer = css`
  cursor: pointer;
`;

const styles = {
  $container,
};

export default styles;
