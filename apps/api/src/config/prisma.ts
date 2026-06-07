import { PrismaClient } from "@prisma/client";
import "./env.js";

export const prisma = new PrismaClient({
  log: process.env.NODE_ENV === "development" ? ["query", "warn", "error"] : ["warn", "error"]
});
