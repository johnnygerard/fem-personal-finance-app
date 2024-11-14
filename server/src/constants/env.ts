import { env } from "node:process";

export const isProduction = env["NODE_ENV"] === "production";
export const port = parseInt(env["PORT"] ?? "3000", 10);
