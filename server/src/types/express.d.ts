import { JsonObjectId } from "./json-object-id.js";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      id: JsonObjectId;
    };
  }
}
