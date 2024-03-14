require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./routers/userRoute");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { ErrorMiddleware } = require("./middleware/error");

require("./db/connect");
app.use((err, req, res, next) => {
  ErrorMiddleware();
  next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);
app.use(userRouter);

app.all("*", (req, res, next) => {
  const err = new Error(`Route ${req.originalUrl} not found `);
  err.statusCode = 404;
  next(err);
});

app.listen(process.env.PORT, () => {
  console.log("server listen on port " + process.env.PORT);
});
