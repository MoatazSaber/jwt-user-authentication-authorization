const mongoose = require("mongoose");
var uuid = require("uuid");

const UserVerificationSchema = mongoose.Schema({
  verificationId: {
    type: String,
    default: function genUUID() {
      return uuid.v4();
    },
  },
  userId: {
    type: String,
    required: true,
  },

  verificationToken: {
    type: String,
  },

  dateCreated: {
    type: Date,
    default: Date.now,
  },
  expiryDate: {
    type: Date,
  },
  dateCompleted: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model("user_verification", UserVerificationSchema);
