const http = require("http");
const { createApp } = require("./app");

const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || "0.0.0.0";

const app = createApp();
const server = http.createServer(app);

server.listen(PORT, HOST, () => {
  // Intentionally concise log line for CI.
  console.log(`listening on http://localhost:3000`);
});

function shutdown(signal) {
  console.log(`received ${signal}, shutting down`);
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 10_000).unref();
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

