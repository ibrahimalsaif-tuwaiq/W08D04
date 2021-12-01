const mongoose = require("mongoose");

// Comments Schema
const commentsSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
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
  deleted: {
    type: Boolean,
    default: false,
  },
});

const commentsModel = mongoose.model("comments", commentsSchema);

module.exports = commentsModel;
