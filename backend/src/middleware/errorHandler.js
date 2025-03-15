const logger = require("../utils/logger");

module.exports = (err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";

  logger.error(`Error ${statusCode}: ${message}`);
  res.status(statusCode).json({ error: message });
};
