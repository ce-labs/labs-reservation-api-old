var nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "laboratorioscefk@gmail.com",
    pass: "hgsjfmfmkeszistn",
  },
});

module.exports = { transporter };
