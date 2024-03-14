const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

const sentMail = async (options) => {
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || "587"),
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_MAIL,
      password: process.env.SMTP_PASSWORD,
    },
  });
  const { email, subject, template, data } = options;
  const templatePath = path.join(__dirname, "../mails", template);
  const html = ejs.renderFile(templatePath, data);
  const mailOption = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject,
    html,
  };
  await transport.sendMail(mailOption);
};

module.exports = sentMail;
