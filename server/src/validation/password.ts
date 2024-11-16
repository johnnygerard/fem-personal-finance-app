export const PASSWORD_MAX_LENGTH = 100;
export const PASSWORD_MIN_LENGTH = 8;

/**
 * Validate a password.
 *
 * Note that this validator is trivial and only checks the length of the password.
 * @param password - The password to validate.
 * @returns Whether the password is valid.
 */
export const isValidPassword = (password: string): boolean =>
  password.length >= PASSWORD_MIN_LENGTH &&
  password.length <= PASSWORD_MAX_LENGTH;
