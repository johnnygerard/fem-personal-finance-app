import type { RequestHandler } from "express";
import { hashPassword } from "../auth/password-hashing.js";
import {
  BAD_REQUEST,
  CONFLICT,
  CREATED,
} from "../constants/http-status-code.js";
import { users } from "../database/mongo-client.js";
import { ApiError } from "../types/api-error.enum.js";
import { parseRegistrationCredentials } from "../validation/ajv/registration-credentials.js";
import { User } from "../database/models/user.js";
import { JsonObjectId } from "../types/json-object-id.js";
import {
  SESSION_COOKIE_NAME,
  sessionCookieOptions,
} from "../constants/security.js";
import { createJwt } from "../auth/jwt.js";

export const createAccount: RequestHandler = async (req, res, next) => {
  try {
    const credentials = parseRegistrationCredentials(req.body);

    if (!credentials) {
      res.status(BAD_REQUEST).json(ApiError.VALIDATION_MISMATCH);
      return;
    }

    const { name, email, password } = credentials;

    const user = await users.findOne({ email });

    if (user) {
      // This response could be used for account enumeration attacks and is not
      // suitable for production code.
      // In a real application, a secret would be sent to the user's email address.
      res.status(CONFLICT).end();
      return;
    }

    // Create new database user
    const digest = await hashPassword(password);
    const { insertedId } = await users.insertOne(new User(name, email, digest));

    // Create new session cookie
    const userId = insertedId.toJSON() as JsonObjectId;
    const jwt = await createJwt(userId);
    res.cookie(SESSION_COOKIE_NAME, jwt, sessionCookieOptions);

    res.status(CREATED).end();
  } catch (e) {
    next(e);
  }
};
