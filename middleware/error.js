const { ErrorHandler } = require("../utils/ErrorHandler");

module.exports.ErroeMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // wrong mongodb id error----

  if (err.name === "CastError") {
    const message = `Resource not found ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Duplicate Key Error ----

  if (err.code === 11000) {
    const message = `Deplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }

  // wrong jwt error----

  if (err.name === "JsonWebTokenError") {
    const message = "Json Web Token is invalid  ! Please try again.";
    err = new ErrorHandler(message, 400);
  }

  // Json web Token expired error----

  if (err.name === "TokenExpiredError") {
    const message = "Json Web Token is Expired ! Please try again.";
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
