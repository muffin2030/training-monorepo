export type LoginResponse = {
  token: string;
  refreshToken: string;
};

export type LoginBody = {
  email: string;
  password: string;
};

export type RefreshTokensBody = {
  refreshToken: string;
};
