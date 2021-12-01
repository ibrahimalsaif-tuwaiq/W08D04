const mongoose = require("mongoose");

// Users Schema
const usersSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "roles",
    required: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});

const usersModel = mongoose.model("users", usersSchema);

module.exports = usersModel;