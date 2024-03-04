import { css } from "@linaria/core";
import { colors } from "@app/theme/colors";

export const $layoutContainer = css`
  height: 100%;
`;

export const $contentContainer = css`
  height: calc(100% - 40px);
`;

export const $container = css`
  height: 40px;
  width: 100%;
  background: ${colors.palette.primary100};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const $links = css`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

export const $active = css`
  background: ${colors.palette.primary200};
`;

export const $headerLink = css`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 10px;
  color: black;
  text-decoration: none;

  &:hover {
    background: ${colors.palette.primary200};
  }
`;

export const $buttonContainer = css`
  width: 80px;
  padding-right: 10px;
`;

export const $logout = css``;
