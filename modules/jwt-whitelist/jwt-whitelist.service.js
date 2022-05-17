//mongodb user model
const JWTWhitelist = require("./models/jwt-whitelist.model");
//hashing for passwords
const bcrypt = require("bcryptjs");
//jwt setup
const jwt = require("jsonwebtoken");

exports.getJWTWhitelist = async (inputJwt, userId) => {
  try {
    const jwt = await JWTWhitelist.findOne({ jwt: inputJwt, userId });
    return jwt;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};
exports.createOrUpdateJWTWhitelist = async (jwt, userId) => {
  try {
    let existingJWTForUser = await JWTWhitelist.findOne({ userId });
    if (existingJWTForUser) {
      const updatedJWTWhitelist = await JWTWhitelist.updateOne(
        { userId },
        {
          $set: {
            jwt,
          },
        }
      );
      return {
        message: `Login Successful, here's your JWT`,
        userId: updatedJWTWhitelist.userId,
        jwt: updatedJWTWhitelist.jwt,
      };
    } else {
      const jwtWhitelist = new JWTWhitelist({
        userId,
        jwt,
      });
      const savedJWTWhitelist = await jwtWhitelist.save();
      return {
        message: `Login Successful, here's your JWT`,
        userId: savedJWTWhitelist.userId,
        jwt: savedJWTWhitelist.jwt,
      };
    }
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

exports.deleteJWTWhitelist = async (jwt, userId) => {
  try {
    const removedJWTWhitelist = await JWTWhitelist.deleteOne({
      jwt,
      userId,
    });
    if (removedJWTWhitelist.deletedCount == 0) {
      console.log("Nothing Was Removed");
      throw new Error("Nothing Was Removed");
    }
    return removedJWTWhitelist;
  } catch (error) {
    throw new Error(error.message);
  }
};
