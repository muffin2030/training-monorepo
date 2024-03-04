import { css } from "@linaria/core";
import { colors } from "@app/theme/colors";

export const $container = css`
  display: flex;
`;

export const $descriptionContainer = css`
  width: 100%;
  display: flex;
  align-items: center;
`;

export const $label = css`
  font-style: italic;
`;

export const $done = css`
  color: ${colors.palette.neutral400};
  text-decoration: line-through;
`;

export const $isDoneButton = css`
  min-width: 80px;
`;

export const $buttonContainer = css`
  width: 150px;
  display: flex;
`;
