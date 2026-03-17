function errorHandler(err, _req, res, next) {
  if (res.headersSent) return next(err);

  // Avoid leaking internal details in API responses.
  res.status(500).json({ error: "Internal Server Error" });
}

module.exports = { errorHandler };

