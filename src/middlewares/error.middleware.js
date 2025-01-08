const checkNotFoundError = (req, res, next) => {
  console.log(`Not Found: ${req.originalUrl}`);
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
};

const catchAsyncHandle = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

module.exports = { checkNotFoundError, catchAsyncHandle };
