const mongoose = require("mongoose");

// Likes Schema
const likesSchema = new mongoose.Schema({
  like: {
    type: Boolean,
    default: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "posts",
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const likesModel = mongoose.model("likes", likesSchema);

module.exports = likesModel;
