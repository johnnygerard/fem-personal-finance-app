import type { CookieOptions } from "express";
import ms from "ms";
import { isProduction } from "./env.js";

export const SESSION_COOKIE_NAME = "id";
export const SESSION_TTL = "2 hours";

export const sessionCookieOptions: CookieOptions = {
  httpOnly: true,
  maxAge: ms(SESSION_TTL),
  path: "/api/user", // Only send the session cookie to private endpoints
  sameSite: "strict",
  secure: isProduction,
};
