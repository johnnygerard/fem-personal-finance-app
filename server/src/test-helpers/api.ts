import type { RegistrationCredentials } from "../types/registration-credentials.js";
import { LoginCredentials } from "../types/login-credentials.js";

const BASE_URL = "http://localhost:3000";
const headers = { "Content-Type": "application/json" };

export const createAccount = async (
  credentials: RegistrationCredentials,
): Promise<Response> => {
  return fetch(new URL("/api/account", BASE_URL), {
    method: "POST",
    headers,
    body: JSON.stringify(credentials),
  });
};

export const createSession = async (
  credentials: LoginCredentials,
): Promise<Response> => {
  return fetch(new URL("/api/session", BASE_URL), {
    method: "POST",
    headers,
    body: JSON.stringify(credentials),
  });
};
