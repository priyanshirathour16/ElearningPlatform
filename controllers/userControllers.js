const User = require("../models/userModel");
const ErrorHandler = require("../utils/ErrorHandler");
const CatchAsyncError = require("../middleware/catchAsyncError");
const jwt = require("jsonwebtoken");
const ejs = require("ejs");
const path = require("path");
const sentMail = require("../utils/sendMail");

const userRegistration = CatchAsyncError(async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const isEmailExist = await User.findOne({ email });
    if (isEmailExist) {
      return next(new ErrorHandler("Email Already exist !", 400));
    }
    const user = {
      name,
      email,
      password,
    };
    const activationToken = createActivationToken(user);
    const activationCode = activationToken.activationCode;
    const data = { user: { name: user.name }, activationCode };
    const html = await ejs.renderFile(
      path.join(__dirname, "../mails/activation-mail.ejs"),
      data
    );

    try {
      await sentMail({
        email: user.email,
        subject: "Active",
        template: "activation-mail.ejs",
        data: data,
      });
      res.status(200).json({
        success: true,
        message: `Please check your email : ${user.email} to verify your account`,
        activationToken: activationToken.token,
      });
    } catch (error) {}
  } catch (err) {
    return next(new ErrorHandler(err.message, 400));
  }
});

const createActivationToken = (user) => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
  const token = jwt.sign(
    {
      user,
      activationCode,
    },
    process.env.ACTIVATION_SECRET,
    {
      expiresIn: "5m",
    }
  );
  return { token, activationCode };
};
