//mongodb user model
const bcrypt = require("bcryptjs/dist/bcrypt");
const User = require("../user/models/User.model");
//mongodb user verification model
const UserVerification = require("./models/user-verification.model");

exports.createUserVerification = async (verificationToken, userId, res) => {
  const userVerification = new UserVerification({
    userId,
    verificationToken,
    dateCreated: Date.now(),
    expiryDate: Date.now() + 21600000,
    dateCompleted: null,
  });

  try {
    const savedUserVerification = await userVerification.save();
    return savedUserVerification;
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "An error occurred while creating user verification instance.",
    });
  }
};
exports.verifyUserEmail = async (req, res) => {
  const { userId, hashedVerificationToken } = req.params;
  const verificationIInstance = await UserVerification.findOne({
    userId,
  });
  if (!verificationIInstance)
    return res.status(400).json({ message: "Invalid Token." });
  if (verificationIInstance.dateCompleted)
    return res.status(400).json({ message: "This email is already verified." });
  const validToken = await bcrypt.compare(
    hashedVerificationToken,
    verificationIInstance.verificationToken
  );
  if (!validToken) return res.status(400).json({ message: "Invalid Token." });
  const currentDate = new Date();
  if (verificationIInstance.expiryDate < currentDate) {
    await UserVerification.deleteOne({
      verificationId: verificationIInstance.verificationId,
    });
    return res.status(400).json({ message: "Token has expired." });
  }
  try {
    const user = await User.updateOne({ userId }, { $set: { verified: true } });
    const verified = await UserVerification.updateOne(
      { verificationId: verificationIInstance.verificationId },
      { $set: { dateCompleted: currentDate, verificationToken: null } }
    );
    return { user, verified };
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};
