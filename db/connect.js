const mongoose = require("mongoose");
const URL = "mongodb://127.0.0.1:27017/Lms";

mongoose
  .connect(URL)
  .then(() => console.log("connection successful"))
  .catch((err) => console.log("error occur"));
