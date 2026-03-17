const express = require("express");
const { rootRouter } = require("./routes/root");
const { notFound } = require("./middleware/notFound");
const { errorHandler } = require("./middleware/errorHandler");

function createApp() {
  const app = express();

  app.disable("x-powered-by");

  app.use(rootRouter);
  app.use(notFound);
  app.use(errorHandler);

  return app;
}

module.exports = { createApp };

