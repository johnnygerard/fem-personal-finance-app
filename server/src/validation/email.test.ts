import { suite, test } from "node:test";
import assert from "node:assert/strict";
import { isValidEmail } from "./email.js";
import { getFakeEmail } from "../test-helpers/faker-extensions.js";

suite("Email validation", () => {
  test("Validation is successful", () => {
    for (let i = 0; i < 100; i++) assert(isValidEmail(getFakeEmail()));
    for (const email of [
      "a@b.c", // minimum length
      "user@mail.example.com", // subdomain
      "user@hyphen-domain.com", // hyphen in domain
      // Examples from https://datatracker.ietf.org/doc/html/rfc3696#section-3
      "user+mailbox@example.com",
      "customer/department=shipping@example.com",
      "$A12345@example.com",
      "!def!xyz%abc@example.com",
      "_somename@example.com",
    ]) {
      assert(isValidEmail(email), `Failed for ${email}`);
    }
  });

  test("Validation fails for valid but unsupported email addresses", () => {
    for (const email of [
      "Abc\\@def@example.com", // escaped special characters
      "Fred\\ Bloggs@example.com", // escaped whitespace
      "Joe.\\\\Blow@example.com", // escaped backslash
      '"Abc@def"@example.com', // quoted string
      "user@münchen.de", // Internationalized domain names (IDNs)
      "user(comment)@example.com", // comment in local part
      "user@(comment)example.com", // comment in domain part
      "user@[192.168.0.1]", // IP addresses in domain part
    ]) {
      assert(!isValidEmail(email), `Failed for ${email}`);
    }
  });

  test("Validation fails for invalid email addresses", () => {
    for (const email of [
      "", // empty string
      " ", // whitespace
      "@", // missing local and domain parts
      "@example.com", // missing local part
      "user@", // missing domain part
      "user@example", // missing TLD
      "user@.com", // missing label
      "user..one@example.com", // consecutive dots in local part
      "user@example..com", // consecutive dots in domain part
      ".user@example.com", // leading dot in local part
      "user.@example.com", // trailing dot in local part
      "user@.example.com", // leading dot in domain part
      "user@example.com.", // trailing dot in domain part
    ]) {
      assert(!isValidEmail(email));
    }
  });
});
