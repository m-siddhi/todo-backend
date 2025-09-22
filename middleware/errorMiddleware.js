function notFound(req, res, next) {
  const err = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(err);
}

function errorHandler(err, req, res, next) {
  const statusCode =
    res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
}

module.exports = { notFound, errorHandler };
