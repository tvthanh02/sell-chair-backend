const badRequest = (res, message) => {
  res.status(400).json({
    error: 1,
    message,
  });
};

module.exports = {
  badRequest,
};
