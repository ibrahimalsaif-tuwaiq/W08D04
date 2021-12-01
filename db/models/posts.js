const mongoose = require("mongoose");

// Posts Schema
const postsSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
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

const postsModel = mongoose.model("posts", postsSchema);

module.exports = postsModel;
