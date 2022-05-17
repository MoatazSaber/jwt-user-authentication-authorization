const express = require("express");
const router = express.Router();
const userVerificationRoute = require("../user-verification/user-verification.controller");
const {
  userAuthorization,
  adminAuthorization,
} = require("../authorization/authorize");
const {
  registerValidation,
  emailLoginValidation,
  usernameLoginValidation,
  updateUserValidation,
  emailValidation,
} = require("./validation-pipes/user-requests-validation");

const {
  getUserById,
  register,
  loginWithEmail,
  loginWithUsername,
  updateUser,
  giveAdminPrivileges,
  logout,
  deleteUser,
} = require("./user.service");

router.use("/verify", userVerificationRoute);

//Get User By Id
router.get("/user-by-token", userAuthorization, async (req, res) => {
  return await getUserById(req, res);
});
//Register
router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  return await register(req, res);
});

//Login
router.post("/login", async (req, res) => {
  if (req.body.email) {
    const { error } = emailLoginValidation(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    return await loginWithEmail(req, res);
  } else if (req.body.username) {
    const { error } = usernameLoginValidation(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    return await loginWithUsername(req, res);
  } else {
    return res
      .status(400)
      .json({ message: "Please provide a username or email." });
  }
});
//Logout
router.post("/logout", userAuthorization, async (req, res) => {
  return await logout(req, res);
});
//Update
router.put("/update", userAuthorization, async (req, res) => {
  const { error } = updateUserValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  return await updateUser(req, res);
});
router.delete("/delete", userAuthorization, async (req, res) => {
  const { error } = emailValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  return await deleteUser(req, res);
});
router.put("/create-admin", adminAuthorization, async (req, res) => {
  const { error } = emailValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  return await giveAdminPrivileges(req, res);
});
module.exports = router;
router.put("/create-super-admin", userAuthorization, async (req, res) => {
  const { error } = emailValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  return await giveAdminPrivileges(req, res);
});
module.exports = router;
