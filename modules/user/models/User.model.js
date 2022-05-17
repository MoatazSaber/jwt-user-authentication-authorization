const mongoose = require("mongoose");
const uuid = require("uuid");

const UserSchema = mongoose.Schema({
  userId: {
    type: String,
    default: function genUUID() {
      return uuid.v4();
    },
  },
  username: {
    type: String,
    required: true,
    unique: true,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  dateUpdated: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model("user", UserSchema);
