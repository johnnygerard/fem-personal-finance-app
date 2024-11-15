import { faker } from "@faker-js/faker";
import { PASSWORD_MAX_LENGTH } from "../validation/password.js";

/**
 * Generate a fake password with random length and characters.
 */
export const getFakePassword = (): string => {
  const length = faker.number.int({ min: 0, max: PASSWORD_MAX_LENGTH });
  return faker.internet.password({ length });
};
