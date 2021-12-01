const express = require("express");

const {
  getCommentsForPost,
  getComment,
  addComment,
  updateComment,
  deleteComment,
  deleteUserComment,
} = require("../controllers/comments");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

const commentsRouter = express.Router();

commentsRouter.get("/comments", authentication, getCommentsForPost);
commentsRouter.get("/comments/:id", authentication, getComment);
commentsRouter.post("/comments", authentication, addComment);
commentsRouter.put("/comments/:id", authentication, updateComment);
commentsRouter.delete("/comments/:id", authentication, deleteComment);
commentsRouter.put("/deleteComment", authentication, authorization, deleteUserComment);

module.exports = commentsRouter;
