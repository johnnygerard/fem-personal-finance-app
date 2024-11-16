export const NAME_MIN_LENGTH = 1;
export const NAME_MAX_LENGTH = 100;

/**
 * Name validation pattern.
 *
 * All Unicode codepoints are permitted except those in the "Other" general
 * category.
 * @see https://unicode.org/reports/tr18/#General_Category_Property
 */
export const NAME_PATTERN = /^\P{C}*$/u;

export const isValidName = (name: string): boolean =>
  name.length >= NAME_MIN_LENGTH &&
  name.length <= NAME_MAX_LENGTH &&
  NAME_PATTERN.test(name);
