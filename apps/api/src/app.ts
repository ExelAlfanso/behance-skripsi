import { Elysia } from "elysia";

export const app = new Elysia()
  .get("/", () => ({
    name: "@behance-skripsi/api",
    status: "ok"
  }))
  .get("/health", () => ({
    status: "ok"
  }));

export type App = typeof app;
