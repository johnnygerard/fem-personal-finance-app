import { env } from "node:process";

export const isProduction = env["NODE_ENV"] === "production";
export const port = parseInt(env["PORT"] ?? "3000", 10);

/**
 * Retrieve a variable value from the environment.
 * @param key - Variable name
 * @param fallback - Variable value to use in non-production environments
 * @returns The variable value in production or the fallback value in other environments
 * @throws {Error} if the variable is empty or unset in production
 */
const getVar = (key: string, fallback: string): string => {
  if (!isProduction) return fallback;
  const value = env[key];
  if (value) return value;

  const state = value === "" ? "empty" : "not set";
  throw new Error(`Environment variable ${key} is ${state}`);
};

export const ARGON2_SECRET = getVar("ARGON2_SECRET", "argon2-secret");
