const express = require("express");

const {
  addComment,
  updateComment,
  deleteComment,
  deleteUserComment,
} = require("../controllers/comments");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

const commentsRouter = express.Router();

commentsRouter.post("/comments", authentication, addComment);
commentsRouter.put("/comments/:id", authentication, updateComment);
commentsRouter.put("/comments/:id", authentication, deleteComment);
commentsRouter.put("/deleteComment", authentication, authorization, deleteUserComment);

module.exports = commentsRouter;
