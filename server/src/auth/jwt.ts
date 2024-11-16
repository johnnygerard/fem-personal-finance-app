import { JWT_SECRET } from "../constants/env.js";
import { jwtVerify, SignJWT } from "jose";
import { SESSION_TTL } from "../constants/security.js";

const secret = new TextEncoder().encode(JWT_SECRET);
const ALGORITHM = "HS256";
const ISSUER = "urn:example:issuer";
const AUDIENCE = "urn:example:audience";

/**
 * Create a signed JWT.
 * @param userId - The user ID for the subject claim
 * @returns The signed JWT
 * @see https://github.com/panva/jose/blob/main/docs/jwt/sign/classes/SignJWT.md
 */
export const createJwt = async (userId: string): Promise<string> =>
  new SignJWT()
    .setProtectedHeader({ alg: ALGORITHM })
    .setSubject(userId)
    .setIssuedAt()
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setExpirationTime(SESSION_TTL)
    .sign(secret);

/**
 * Verify a JWT.
 * @param jwt - The JWT to verify
 * @returns The payload and the protected header
 * @see https://github.com/panva/jose/blob/main/docs/jwt/verify/functions/jwtVerify.md
 */
export const verifyJwt = async (jwt: string) =>
  jwtVerify<{
    aud: string;
    exp: number;
    iat: number;
    iss: string;
    sub: string;
  }>(jwt, secret, {
    issuer: ISSUER,
    audience: AUDIENCE,
    algorithms: [ALGORITHM],
    requiredClaims: ["sub", "iat", "exp"],
  });
