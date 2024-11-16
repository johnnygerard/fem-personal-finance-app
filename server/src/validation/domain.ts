/**
 * DNS label pattern according to RFC 1034
 *
 * Validity rules:
 * - Character length is at least 1 and at most 63.
 * - Character set is limited to ASCII letters, digits, and hyphens.
 * - Letters are case-insensitive.
 * - Leading and trailing hyphens are disallowed.
 * - Leading digits are disallowed.
 * @see https://datatracker.ietf.org/doc/html/rfc1034#section-3.5
 */
const LABEL_PATTERN = /^[a-z](?:[a-z0-9-]{0,61}[a-z0-9])?$/i;

/**
 * Maximum number of characters in a domain name.
 *
 * Note that this differs from the byte length of 255.
 * @see https://datatracker.ietf.org/doc/html/rfc1034#section-3.1
 * @example
 * `x.com` is equivalent to `.x.com.`
 *
 * Label to hex (one byte for the label length followed by the label value):
 * - `x`: 0x01 0x78
 * - `com`: 0x03 0x63 0x6f 0x6d
 * - `` (null label): 0x00
 */
export const DOMAIN_MAX_LENGTH = 253;

/**
 * Validate a domain name according to RFC 1034.
 *
 * Note that this validator does not recognize IDNs.
 * @param domain - Domain name to validate
 * @returns `true` if the domain name is valid, `false` otherwise
 * @see https://datatracker.ietf.org/doc/html/rfc1034#section-3.5
 */
export const isValidDomain = (domain: string): boolean => {
  if (domain.length > DOMAIN_MAX_LENGTH) return false;
  const labels = domain.split(".");

  return (
    labels.length >= 2 && labels.every((label) => LABEL_PATTERN.test(label))
  );
};
