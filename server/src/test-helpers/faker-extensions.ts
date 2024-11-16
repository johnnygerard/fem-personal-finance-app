import { faker } from "@faker-js/faker";
import { PASSWORD_MAX_LENGTH } from "../validation/password.js";
import { RegistrationCredentials } from "../types/registration-credentials.js";
import { LoginCredentials } from "../types/login-credentials.js";

/**
 * Generate a fake email address with special characters.
 */
export const getFakeEmail = (): string => {
  return faker.internet.email({ allowSpecialCharacters: true });
};

/**
 * Generate a fake password with random length and characters.
 */
export const getFakePassword = (): string => {
  const length = faker.number.int({ min: 0, max: PASSWORD_MAX_LENGTH });
  return faker.internet.password({ length });
};

export const getFakeLoginCredentials = (): LoginCredentials => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const getFakeRegistrationCredentials = (): RegistrationCredentials => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    name: faker.person.fullName({
      firstName,
      lastName,
    }),
    email: faker.internet.email({
      firstName,
      lastName,
      allowSpecialCharacters: true,
    }),
    password: faker.internet.password(),
  };
};
