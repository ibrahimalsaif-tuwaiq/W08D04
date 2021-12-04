const postsModel = require("./../../db/models/posts");
const commentsModel = require("./../../db/models/comments");
const likesModel = require("./../../db/models/likes");

const getPosts = async (req, res) => {
  let result = [];

  try {
    const posts = await postsModel.find({
      createdBy: req.token.id,
      deleted: false,
    });

    if (posts.length > 0) {

      for(let i = 0; i < posts.length; i++) {
        const comments = await commentsModel.find({
          post: posts[i].id,
          deleted: false,
        });

        const likes = await likesModel.find({
          post: posts[i].id,
          deleted: false,
        });

        if (comments.length > 0) {
          result.push({
            post: posts[i],
            comments,
            likes: likes.length,
          });
        } else {
          result.push({
            post: posts[i],
            comments: "there is no comments yet!!",
            likes: likes.length,
          });
        }
      };

      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "There is no posts yet!!" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await postsModel
      .findOne({
        _id: id,
        createdBy: req.token.id,
        deleted: false,
      })
      .populate("createdBy");

    const comments = await commentsModel
      .find({
        post: id,
        deleted: false,
      })
      .populate("createdBy");

    const likes = await likesModel.find({
      post: id,
      like: true,
    });

    if (post) {
      if (comments.length > 0) {
        res.status(200).json({ post, comments, likes: likes.length });
      } else {
        res.status(200).json({
          post,
          comments: "there is no comments yet!!",
          likes: likes.length,
        });
      }
    } else {
      res.status(404).json({ message: `There is no post with this ID: ${id}` });
    }
  } catch (error) {
    res.status(400).json(error);
  }
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

const likePost = async (req, res) => {
  const { id } = req.params;
  const { like } = req.body;

  if (like) {
    try {
      const like = await likesModel.findOne({
        post: id,
        createdBy: req.token.id,
      });

      if (like) {
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
    } catch (error) {
      res.status(400).json(error);
    }
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
        commentsModel
          .updateMany({ post: id, deleted: false }, { deleted: true })
          .then(() => {
            console.log(`All the comments for post:${id} has been deleted`);
          })
          .catch((err) => {
            console.log(err);
          });
        likesModel
          .updateMany({ post: id, like: true }, { like: false })
          .then(() => {
            console.log(`All the likes for post:${id} has been deleted`);
          })
          .catch((err) => {
            console.log(err);
          });
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
        commentsModel
          .updateMany({ post: postID, deleted: false }, { deleted: true })
          .then(() => {
            console.log(`All the comments for post:${postID} has been deleted`);
          })
          .catch((err) => {
            console.log(err);
          });
        likesModel
          .updateMany({ post: postID, like: true }, { like: false })
          .then(() => {
            console.log(`All the likes for post:${postID} has been deleted`);
          })
          .catch((err) => {
            console.log(err);
          });
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
