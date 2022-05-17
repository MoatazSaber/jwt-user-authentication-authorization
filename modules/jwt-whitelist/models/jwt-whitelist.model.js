const mongoose = require("mongoose");
const uuid = require("uuid");

const JWTWhitelistSchema = mongoose.Schema({
  userId: {
    type: String,
    unique: true,
    required: true,
  },
  jwt: {
    type: String,
    required: true,
    unique: true,
    max: 255,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("jwtWhitelist", JWTWhitelistSchema);
