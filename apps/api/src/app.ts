import express from "express";
import { errorHandler } from "./middleware/error.js";
import { installSecurity } from "./middleware/security.js";
import { v1 } from "./routes/v1.js";

export function createApp() {
  const app = express();
  installSecurity(app);
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true }));
  app.use("/api/v1", v1);
  app.use(errorHandler);
  return app;
}
