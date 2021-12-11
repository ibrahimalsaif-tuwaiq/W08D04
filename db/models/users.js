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
  },
  avatar: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
  },
  passwordCode: {
    type: String,
  },
  activeCode: {
    type: String,
  },
  active: {
    type: Boolean,
    default: false,
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
