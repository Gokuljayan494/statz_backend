const nodemailer = require("nodemailer");

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Your SMTP host
  port: 465, // Your SMTP port
  secure: true, // true for 465, false for other ports
  auth: {
    user: "gokuljayan494@gmail.com", // Your email address
    pass: "uvgb kvme almm ycrf", // Your email password
  },
});

// Setup email data with unicode symbols

// Send mail with defined transport object

const sendMail = function (mailOptions) {
  return transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
  });
};

module.exports = sendMail;
