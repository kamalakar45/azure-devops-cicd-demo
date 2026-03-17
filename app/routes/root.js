const express = require("express");

const router = express.Router();

router.get("/", (_req, res) => {
  res.status(200).json({ message: "Hello CI/CD" });
});

router.get("/healthz", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

module.exports = { rootRouter: router };

