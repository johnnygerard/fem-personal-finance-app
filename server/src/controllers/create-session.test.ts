import { suite, test } from "node:test";
import {
  getFakeLoginCredentials,
  getFakeRegistrationCredentials,
} from "../test-helpers/faker-extensions.js";
import { CREATED, UNAUTHORIZED } from "../constants/http-status-code.js";
import assert from "node:assert/strict";
import { createAccount, createSession } from "../test-helpers/api.js";
import { LoginCredentials } from "../types/login-credentials.js";
import { ApiError } from "../types/api-error.enum.js";
import { faker } from "@faker-js/faker";

suite("Session creation", () => {
  let credentials: LoginCredentials;

  test.before(async () => {
    const registrationCredentials = getFakeRegistrationCredentials();
    credentials = {
      email: registrationCredentials.email,
      password: registrationCredentials.password,
    };

    const response = await createAccount(registrationCredentials);
    assert.equal(response.status, CREATED);
  });

  test("is successful.", async () => {
    const response = await createSession(credentials);
    assert.equal(response.status, CREATED);
  });

  test("fails when the email address is not registered.", async () => {
    const response = await createSession(getFakeLoginCredentials());

    assert.equal(response.status, UNAUTHORIZED);
    assert.equal(await response.json(), ApiError.BAD_CREDENTIALS);
  });

  test("fails when the password is incorrect.", async () => {
    const response = await createSession({
      email: credentials.email,
      password: faker.internet.password(),
    });

    assert.equal(response.status, UNAUTHORIZED);
    assert.equal(await response.json(), ApiError.BAD_CREDENTIALS);
  });
});
