const nodemailer = require("nodemailer");

// Configure transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,       // example: smtp.gmail.com
  port: process.env.SMTP_PORT,       // example: 587
  secure: false,                     // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,     // your email
    pass: process.env.SMTP_PASSWORD  // your email password or app password
  }
});

/**
 * sendEmail - sends an email
 * @param {string} to - recipient email
 * @param {string} subject - email subject
 * @param {string} html - html content of email
 */
const sendEmail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"AlgoVisualizer" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });
    console.log("Email sent: %s", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

module.exports = { sendEmail };
