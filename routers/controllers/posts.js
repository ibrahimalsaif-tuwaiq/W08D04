const postsModel = require("./../../db/models/posts");

const getPosts = (req, res) => {
  postsModel
    .find({ createdBy: req.token.id, deleted: false })
    .then((result) => {
      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "There is no posts yet!!" });
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const getPost = (req, res) => {
  const { id } = req.params;

  postsModel
    .findOne({ _id: id, createdBy: req.token.id, deleted: false })
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res
          .status(404)
          .json({ message: `There is no todo with this ID: ${id}` });
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
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
