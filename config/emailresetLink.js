const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const sendMail = async (to, subject, otp) => {
  try {
    await transporter.sendMail({
      to,
      subject,
      html: otp,
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

function sendOTP(gmail) {
  const token = jwt.sign({ email: gmail }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  const url = `http://localhost:3000/reset-password/${token}`;
  sendMail(
    gmail,
    "Your OTP for Password Reset - TodoList",
    `Please use this Link for Password Reset ${url}`
  );
  console.log("Message Sent");
}
module.exports = sendOTP;