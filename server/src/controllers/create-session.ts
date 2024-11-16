import type { RequestHandler } from "express";
import {
  BAD_REQUEST,
  CREATED,
  UNAUTHORIZED,
} from "../constants/http-status-code.js";
import { ApiError } from "../types/api-error.enum.js";
import {
  SESSION_COOKIE_NAME,
  sessionCookieOptions,
} from "../constants/security.js";
import { createJwt } from "../auth/jwt.js";
import { parseLoginCredentials } from "../validation/ajv/login-credentials.js";
import { users } from "../database/mongo-client.js";
import { verifyPassword } from "../auth/password-hashing.js";

export const createSession: RequestHandler = async (req, res, next) => {
  try {
    const credentials = parseLoginCredentials(req.body);

    if (!credentials) {
      res.status(BAD_REQUEST).json(ApiError.VALIDATION_MISMATCH);
      return;
    }

    const { email, password } = credentials;

    const user = await users.findOne(
      { email },
      { projection: { password: 1 } },
    );

    if (!user) {
      res.status(UNAUTHORIZED).json(ApiError.BAD_CREDENTIALS);
      return;
    }

    const isCorrectPassword = await verifyPassword(user.password, password);

    if (!isCorrectPassword) {
      res.status(UNAUTHORIZED).json(ApiError.BAD_CREDENTIALS);
      return;
    }

    // Create new session cookie
    const jwt = await createJwt(user._id.toJSON());
    res.cookie(SESSION_COOKIE_NAME, jwt, sessionCookieOptions);

    res.status(CREATED).end();
  } catch (e) {
    next(e);
  }
};
