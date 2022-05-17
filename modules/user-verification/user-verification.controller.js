const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../user/models/User.model");
const { verifyUserEmail } = require("./user-verification.service");
const { sendVerificationEmail } = require("../mailer/mailer.config");
const UserVerification = require("./models/user-verification.model");
//Verify Email Address
router.get("/:userId/:hashedVerificationToken", async (req, res) => {
  const verified = await verifyUserEmail(req, res);
  if (verified.user) {
    const user = verified.user;
    const token = jwt.sign(
      {
        userId: user.userId,
        username: user.username,
        email: user.email,
        verified: user.verified,
      },
      process.env.JWT_TOKEN_SECRET
    );
    return res
      .status(200)
      .header("auth-token", token)
      .json({ message: "Account Activated Successfully.", token });
  }
});
router.post("/resendVerificationEmail/:email", async (req, res) => {
  const user = await User.findOne({ email: req.params.email });
  if (user.verified == true)
    return res.status(400).json({ message: "This email is already verified." });

  const userVerification = await UserVerification.findOne({
    userId: user.userId,
  });
  if (userVerification) {
    await UserVerification.deleteOne({ userId: user.userId });
  }
  const sent = await sendVerificationEmail(user, res);
  if (sent) {
    res.status(201).json({
      message: `Please Check your email to activate your account.`,
      userId: user.userId,
      email: user.email,
    });
  } else {
    return res.status(500).json({
      message: `Internal Server Error, Please Try again later.`,
    });
  }
});
module.exports = router;
