import { DOMAIN_MAX_LENGTH, isValidDomain } from "./domain.js";

const LOCAL_MAX_LENGTH = 64;
export const EMAIL_MAX_LENGTH = LOCAL_MAX_LENGTH + 1 + DOMAIN_MAX_LENGTH;

/**
 * Simplified local part pattern according to RFC 5322
 *
 * This pattern is equivalent to the `dot-atom-text` token.
 * @see https://datatracker.ietf.org/doc/html/rfc5322#section-3.2.3
 */
const LOCAL_PATTERN =
  /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*$/i;

const isValidLocal = (local: string): boolean => {
  return local.length <= LOCAL_MAX_LENGTH && LOCAL_PATTERN.test(local);
};

/**
 * Validates an email address according to RFC 5322.
 *
 * Note that this validator does not recognize the following:
 * - IP addresses and IDNs in the domain part
 * - Quoted strings, comments, and folding whitespace in the local part
 * - Obsolete syntax
 * @param email - Email address to validate
 * @returns `true` if the email address is valid, `false` otherwise
 * @see https://datatracker.ietf.org/doc/html/rfc5322#section-3.4.1
 */
export const isValidEmail = (email: string): boolean => {
  if (email.length > EMAIL_MAX_LENGTH) return false;

  const parts = email.split("@");
  const [local, domain] = parts;

  return parts.length === 2 && isValidLocal(local) && isValidDomain(domain);
};
