const errorHandler = (error, req, res, next) => {
  console.log(error);
  if (error.status === 401) {
    return res.status(error.status).json({ message: error.message || error.error });
  }
  res.sendStatus(500);
};

module.exports = errorHandler;
