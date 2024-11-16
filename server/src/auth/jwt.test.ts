import { suite, test } from "node:test";
import { faker } from "@faker-js/faker";
import { createJwt, verifyJwt } from "./jwt.js";
import assert from "node:assert/strict";
import ms from "ms";
import { Buffer } from "node:buffer";

/**
 * The pattern for a JWT.
 *
 * Format: `header.payload.signature`
 * Encoding: base64url
 * @see https://datatracker.ietf.org/doc/html/rfc7519
 */
const JWT_PATTERN = /^[\w-]+(?:\.[\w-]+){2}$/;

suite("JWT creation and verification", () => {
  test("Creation is successful", async () => {
    const userId = faker.database.mongodbObjectId();
    const jwt = await createJwt(userId);
    assert.match(jwt, JWT_PATTERN);
  });

  test("Verification is successful", async () => {
    const userId = faker.database.mongodbObjectId();
    const jwt = await createJwt(userId);
    const { payload } = await verifyJwt(jwt);
    assert.equal(payload.sub, userId);
  });

  test("Verification fails with expired token", async (context) => {
    context.mock.timers.enable({ apis: ["Date"] });
    const userId = faker.database.mongodbObjectId();
    const jwt = await createJwt(userId);

    context.mock.timers.tick(ms("1 year"));
    await assert.rejects(async () => {
      await verifyJwt(jwt);
    });
  });

  test("Verification fails if the token has no signature", async () => {
    // Create a valid but unsigned JWT
    const userId = faker.database.mongodbObjectId();
    const jwt = await createJwt(userId);
    const payload = jwt.split(".")[1];
    const header = Buffer.from('{"alg":"none"}').toString("base64url");
    const unsignedJwt = [header, payload, ""].join(".");

    await assert.rejects(async () => {
      await verifyJwt(unsignedJwt);
    });
  });
});
