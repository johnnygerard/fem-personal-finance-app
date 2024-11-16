import type { RequestHandler } from "express";
import { UNAUTHORIZED } from "../constants/http-status-code.js";
import { ApiError } from "../types/api-error.enum.js";
import { SESSION_COOKIE_NAME } from "../constants/security.js";
import { verifyJwt } from "../auth/jwt.js";
import { JOSEError, JWTExpired } from "jose/errors";

export const sessionAuthentication: RequestHandler = async (req, res, next) => {
  try {
    const jwt = req.cookies[SESSION_COOKIE_NAME];

    if (typeof jwt !== "string") {
      res.status(UNAUTHORIZED).json(ApiError.UNAUTHENTICATED);
      return;
    }

    const { payload } = await verifyJwt(jwt);
    req.user = { id: payload.sub };
    next();
  } catch (e) {
    if (e instanceof JWTExpired) {
      res.status(UNAUTHORIZED).json(ApiError.TOKEN_EXPIRED);
      return;
    }

    if (e instanceof JOSEError) {
      res.status(UNAUTHORIZED).json(ApiError.UNAUTHENTICATED);
      return;
    }

    next(e);
  }
};
