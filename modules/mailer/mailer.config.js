//node mailer import
const nodeMailer = require("nodemailer");
//hashing for passwords
const bcrypt = require("bcryptjs");
//uuid import
const uuid = require("uuid");

const {
  createUserVerification,
} = require("../user-verification/user-verification.service");

require("dotenv/config");
const transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAILER_EMAIL,
    pass: process.env.MAILER_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Mailer Up And Running");
  }
});

exports.sendVerificationEmail = async (user, res) => {
  const currentUrl = process.env.CURRENT_URL;
  const verificationToken = uuid.v4() + user.userId;
  const verificationUrl = `${currentUrl}api/users/verify/${user.userId}/${verificationToken}`;

  const mailOptions = {
    from: process.env.MAILER_EMAIL,
    to: user.email,
    subject: "Verify Your Email",
    html: `
    <p>Verify your email address to complete the signup and login into your account.</p>
    <p><b>This Link Expires in 6 Hours</b>.</p>
    <p><a href=${verificationUrl} >Click Here</a>To Proceed.</p>`,
  };

  //hash the activation token
  const salt = await bcrypt.genSalt(10);
  try {
    const hashedToken = await bcrypt.hash(verificationToken, salt);

    //create user verification instance
    const verification = await createUserVerification(
      hashedToken,
      user.userId,
      res
    );
    //Send Email
    await transporter.sendMail(mailOptions);
    return verification;
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
