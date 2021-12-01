const commentsModel = require("./../../db/models/comments");

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
  const { id } = req.params;
  const { description, postID } = req.body;

  commentsModel
    .findOneAndUpdate(
      { _id: id, post: postID, createdBy: req.token.id, deleted: false },
      {
        description,
      },
      { new: true }
    )
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res
          .status(404)
          .json({ message: `There is no comment with this ID: ${id}` });
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const deleteComment = (req, res) => {
  const { id } = req.params;
  const { postID } = req.body;

  commentsModel
    .findOneAndUpdate(
      { _id: id, post: postID, createdBy: req.token.id, deleted: false },
      { deleted: true },
      { new: true }
    )
    .then((result) => {
      if (result) {
        res
          .status(200)
          .json({ message: "The Comment has been deleted successfully" });
      } else {
        res
          .status(404)
          .json({ message: `There is no comment with this ID: ${id}` });
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const deleteUserComment = (req, res) => {
  const { commentID, postID, creatorID } = req.body;

  commentsModel
    .findOneAndUpdate(
      { _id: commentID, post: postID, createdBy: creatorID, deleted: false },
      { deleted: true },
      { new: true }
    )
    .then((result) => {
      if (result) {
        res
          .status(200)
          .json({ message: "The Comment has been deleted successfully" });
      } else {
        res
          .status(404)
          .json({ message: `There is no comment with this ID: ${commentID}` });
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = {
  addComment,
  updateComment,
  deleteComment,
  deleteUserComment,
};
