const errorHandler = (error, req, res, next) => {
  console.log(error);
  res.sendStatus(500);
};

module.exports = errorHandler;
