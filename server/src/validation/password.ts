export const PASSWORD_MAX_LENGTH = 100;
export const PASSWORD_MIN_LENGTH = 8;

export const isValidPassword = (password: string): boolean =>
  password.length >= PASSWORD_MIN_LENGTH &&
  password.length <= PASSWORD_MAX_LENGTH;
