const jwt = require("jsonwebtoken");
const { getJWTWhitelist } = require("../jwt-whitelist/jwt-whitelist.service");
exports.userAuthorization = async function (req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).json({ message: "Access Denied" });
  try {
    const verifiedUser = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    const jwtWhitelist = await getJWTWhitelist(token, verifiedUser.userId);
    if (!jwtWhitelist)
      return res.status(401).json({ message: "Invalid Token" });
    if (verifiedUser.verified == false)
      res.status(400).json({ message: "Please Verify your Email." });
    req.user = verifiedUser;
    next();
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Invalid Token" });
  }
};
exports.adminAuthorization = async function (req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).json({ message: "Access Denied" });
  try {
    const verifiedUser = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    const jwtWhitelist = await getJWTWhitelist(token, verifiedUser.userId);
    if (!jwtWhitelist)
      return res.status(401).json({ message: "Invalid Token" });
    if (verifiedUser.verified == false)
      res.status(400).json({ message: "Please Verify your Email." });
    if (verifiedUser.role !== "admin")
      res.status(401).json({ message: "Insufficient Permissions ." });
    req.user = verifiedUser;
    next();
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Invalid Token" });
  }
};
