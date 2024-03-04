import { css } from "@linaria/core";

export const $layout = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const $container = css`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > div {
    margin-top: 10px;
  }
`;
