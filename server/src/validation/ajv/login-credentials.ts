import type { JTDSchemaType } from "ajv/dist/types/jtd-schema.js";
import { ajv } from "./index.js";
import { LoginCredentials } from "../../types/login-credentials.js";
import { isValidEmail } from "../email.js";
import { isValidPassword } from "../password.js";

const schema: JTDSchemaType<LoginCredentials> = {
  properties: {
    email: { type: "string" },
    password: { type: "string" },
  },
  additionalProperties: false,
};

const parse = ajv.compileParser(schema);

export const parseLoginCredentials = (
  json: string,
): LoginCredentials | undefined => {
  const credentials = parse(json);

  if (credentials) {
    const { email, password } = credentials;

    if (isValidEmail(email) && isValidPassword(password)) return credentials;
  }
};
