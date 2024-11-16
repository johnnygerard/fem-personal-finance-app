import { suite, test } from "node:test";
import { getFakeRegistrationCredentials } from "../test-helpers/faker-extensions.js";
import assert from "node:assert/strict";
import {
  BAD_REQUEST,
  CONFLICT,
  CREATED,
} from "../constants/http-status-code.js";
import { ApiError } from "../types/api-error.enum.js";
import { createAccount } from "../test-helpers/api.js";
import type { RegistrationCredentials } from "../types/registration-credentials.js";

suite("Account creation", () => {
  test("is successful.", async () => {
    const response = await createAccount(getFakeRegistrationCredentials());
    assert.equal(response.status, CREATED);
  });

  test("fails when the JSON payload is invalid.", async () => {
    const response = await createAccount({
      ...getFakeRegistrationCredentials(),
      invalid: "json",
    } as RegistrationCredentials);

    assert.equal(response.status, BAD_REQUEST);
    assert.equal(await response.json(), ApiError.VALIDATION_MISMATCH);
  });

  test("fails when using an existing email address.", async () => {
    const credentials = getFakeRegistrationCredentials();
    await createAccount(credentials);

    const response = await createAccount({
      ...getFakeRegistrationCredentials(),
      email: credentials.email,
    });

    assert.equal(response.status, CONFLICT);
  });
});
