const commentsModel = require("./../../db/models/comments");

const getCommentsForPost = (req, res) => {
  // code
};

const getComment = (req, res) => {
  // code
};

const addComment = (req, res) => {
  const { description, postID } = req.body;

  const newComment = new commentsModel({
    description,
    post: postID,
    createdBy: req.token.id,
  });

  newComment
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const updateComment = (req, res) => {
  // code
};

const deleteComment = (req, res) => {
  // code
};

const deleteUserComment = (req, res) => {
  // code
};

module.exports = {
  getCommentsForPost,
  getComment,
  addComment,
  updateComment,
  deleteComment,
  deleteUserComment,
};
