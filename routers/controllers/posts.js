const postsModel = require("./../../db/models/posts");

const getPosts = (req, res) => {
  // code
};

const getPost = (req, res) => {
  // code
};

const addPost = (req, res) => {
  const { image, description } = req.body;

  const newPost = new postsModel({
    image,
    description,
    createdBy: req.token.id,
  });

  newPost
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const updatePost = (req, res) => {
  // code
};

const deletePost = (req, res) => {
  // code
};

const deleteUserPost = (req, res) => {
  // code
};

module.exports = {
  getPosts,
  getPost,
  addPost,
  updatePost,
  deletePost,
  deleteUserPost,
};
