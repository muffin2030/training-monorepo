import { css } from "@linaria/core";
import { spacing } from "@app/theme/spacing";
import { colors } from "@app/theme/colors";

export const $container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: ${spacing.md}px;
`;

export const $formContainer = css`
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${spacing.md}px ${spacing.lg}px;
  border: 1px solid ${colors.border};
  border-radius: 10px;
`;

export const $addButton = css`
  width: 100px;
  margin-top: ${spacing.md}px;
`;

export const $tasksContainer = css`
  margin-top: ${spacing.md}px;
  width: 300px;
`;

export const $taskCard = css`
  margin-top: ${spacing.md}px;
`;

export const $filterContainer = css`
  margin-top: ${spacing.md}px;
  width: 100px;
`;
