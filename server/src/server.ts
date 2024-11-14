import type { ErrorRequestHandler } from "express";
import express from "express";
import {
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
} from "./constants/http-status-code.js";
import { isProduction, port } from "./constants/env.js";

const app = express();

// Trust requests from Heroku's load balancer
app.set("trust proxy", 1);

// Final catch-all controller
app.use((req, res) => {
  res.status(NOT_FOUND).end();
});

// Global error handler
app.use(((e, req, res, next) => {
  // Delegate to default error handler if headers have already been sent
  // See https://expressjs.com/en/guide/error-handling.html
  if (res.headersSent) {
    next(e);
    return;
  }

  console.error(e);
  res.status(INTERNAL_SERVER_ERROR).end();
}) as ErrorRequestHandler);

// Start the server
if (isProduction) {
  // Omitted host defaults to 0.0.0.0 or [::] if IPv6 is supported
  app.listen(port, () => {
    console.log("Express server listening on port", port);
  });
} else {
  const HOST = "localhost";

  app.listen(port, HOST, () => {
    console.log(`Express server listening at http://${HOST}:${port}`);
  });
}