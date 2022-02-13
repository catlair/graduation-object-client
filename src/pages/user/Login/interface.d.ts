export interface LoginInput {
  password: string;
  username: string | number;
}

export interface LoginEmailInput {
  email?: string;
  code?: string;
}
