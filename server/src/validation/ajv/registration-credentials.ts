import { JTDSchemaType } from "ajv/dist/types/jtd-schema.js";
import { RegistrationCredentials } from "../../types/registration-credentials.js";
import { ajv } from "./index.js";
import { isValidEmail } from "../email.js";
import { isValidPassword } from "../password.js";
import { isValidName } from "../name.js";

const schema: JTDSchemaType<RegistrationCredentials> = {
  properties: {
    name: { type: "string" },
    email: { type: "string" },
    password: { type: "string" },
  },
  additionalProperties: false,
};

const parse = ajv.compileParser(schema);

export const parseRegistrationCredentials = (
  json: string,
): RegistrationCredentials | undefined => {
  const credentials = parse(json);

  if (credentials) {
    const { name, email, password } = credentials;

    if (isValidName(name) && isValidEmail(email) && isValidPassword(password))
      return credentials;
  }
};
