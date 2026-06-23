import { app } from "./app";

const port = Number(Bun.env.PORT ?? 3001);

const server = app.listen(port);

console.log(`Elysia API is running at ${server.server?.hostname}:${server.server?.port}`);
