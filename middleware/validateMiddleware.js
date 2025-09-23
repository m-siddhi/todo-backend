module.exports = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    res.status(400);
    const msg = error.details.map((d) => d.message).join("; ");
    return next(new Error(msg));
  }

  next();
};
