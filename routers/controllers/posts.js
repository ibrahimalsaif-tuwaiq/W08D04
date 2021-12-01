const postsModel = require("./../../db/models/posts");
const commentsModel = require("./../../db/models/comments");
const likesModel = require("./../../db/models/likes");

const getPosts = (req, res) => {
  postsModel
    .find({ createdBy: req.token.id, deleted: false })
    .populate("createdBy")
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
    .populate("createdBy")
    .then((post) => {
      if (post) {
        commentsModel
          .find({ post: id, deleted: false })
          .populate("createdBy")
          .then((comments) => {
            likesModel.find({ post: id, like: true }).then((likes) => {
              if (comments.length > 0) {
                res.status(200).json({ post, comments, likes: likes.length });
              } else {
                res.status(200).json({ post, likes: likes.length });
              }
            });
          });
      } else {
        res
          .status(404)
          .json({ message: `There is no post with this ID: ${id}` });
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
  const { id } = req.params;
  const { image, description } = req.body;

  postsModel
    .findOneAndUpdate(
      { _id: id, createdBy: req.token.id, deleted: false },
      {
        image,
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
          .json({ message: `There is no post with this ID: ${id}` });
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const likePost = (req, res) => {
  const { id } = req.params;
  const { like } = req.body;

  if (like) {
    likesModel
      .findOne({ post: id, createdBy: req.token.id })
      .then((result) => {
        if (result) {
          likesModel
            .findOneAndUpdate(
              { post: id, createdBy: req.token.id, like: false },
              { like: true },
              { new: true }
            )
            .then((result) => {
              if (result) {
                res
                  .status(200)
                  .json({ message: "The Post has been liked successfully" });
              } else {
                res
                  .status(404)
                  .json({ message: `There is no post with this ID: ${id}` });
              }
            })
            .catch((err) => {
              res.status(400).json(err);
            });
        } else {
          const newLike = new likesModel({
            post: id,
            createdBy: req.token.id,
          });

          newLike
            .save()
            .then((result) => {
              res.status(201).json(result);
            })
            .catch((err) => {
              res.status(400).json(err);
            });
        }
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } else {
    likesModel
      .findOneAndUpdate(
        { post: id, createdBy: req.token.id, like: true },
        { like: false },
        { new: true }
      )
      .then((result) => {
        if (result) {
          res
            .status(200)
            .json({ message: "The Post has been disliked successfully" });
        } else {
          res
            .status(404)
            .json({ message: `There is no post with this ID: ${id}` });
        }
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }
};

const deletePost = (req, res) => {
  const { id } = req.params;

  postsModel
    .findOneAndUpdate(
      { _id: id, createdBy: req.token.id, deleted: false },
      { deleted: true },
      { new: true }
    )
    .then((result) => {
      if (result) {
        res
          .status(200)
          .json({ message: "The Post has been deleted successfully" });
      } else {
        res
          .status(404)
          .json({ message: `There is no post with this ID: ${id}` });
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const deleteUserPost = (req, res) => {
  const { postID, creatorID } = req.body;

  postsModel
    .findOneAndUpdate(
      { _id: postID, createdBy: creatorID, deleted: false },
      { deleted: true },
      { new: true }
    )
    .then((result) => {
      if (result) {
        res
          .status(200)
          .json({ message: "The Post has been deleted successfully" });
      } else {
        res
          .status(404)
          .json({ message: `There is no post with this ID: ${id}` });
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = {
  getPosts,
  getPost,
  addPost,
  updatePost,
  deletePost,
  deleteUserPost,
  likePost,
};
