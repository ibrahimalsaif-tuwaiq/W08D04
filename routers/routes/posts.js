const express = require("express");

const {
  getPosts,
  getPost,
  addPost,
  updatePost,
  deletePost,
  deleteUserPost,
} = require("../controllers/posts");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

const postsRouter = express.Router();

postsRouter.get("/posts", authentication, getPosts);
postsRouter.get("/posts/:id", authentication, getPost);
postsRouter.post("/posts", authentication, addPost);
postsRouter.put("/posts/:id", authentication, updatePost);
postsRouter.delete("/posts/:id", authentication, deletePost);
postsRouter.delete("/deletePost/:id", authentication, authorization, deleteUserPost);

module.exports = postsRouter;
