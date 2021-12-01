const usersModel = require("./../../db/models/users");
const postsModel = require("./../../db/models/posts");
const commentsModel = require("./../../db/models/comments");
const likesModel = require("./../../db/models/likes");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Config .env file
dotenv.config();

// Get SALT variable from .env
const SALT = Number(process.env.SALT);

// Get SECRET_KEY variable from .env
const SECRET = process.env.SECRET_KEY;

const signup = async (req, res) => {
  const { email, username, password, avatar, role } = req.body;

  const lowerCaseEmail = email.toLowerCase();
  const lowerCaseUsername = username.toLowerCase();
  const hashedPassword = await bcrypt.hash(password, SALT);

  const newUser = new usersModel({
    email: lowerCaseEmail,
    username: lowerCaseUsername,
    password: hashedPassword,
    avatar,
    role,
  });

  newUser
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const login = (req, res) => {
  const { identifier, password } = req.body;

  const lowerCaseIdentifier = identifier.toLowerCase();

  usersModel
    .findOne({
      $or: [{ username: identifier }, { email: identifier }],
    })
    .populate("role")
    .then(async (result) => {
      if (result) {
        if (result.deleted === false) {
          if (
            result.email == lowerCaseIdentifier ||
            result.username == lowerCaseIdentifier
          ) {
            const matchedPassword = await bcrypt.compare(
              password,
              result.password
            );

            if (matchedPassword) {
              const payload = {
                id: result._id,
                email: result.email,
                username: result.username,
                role: result.role.role,
                deleted: result.deleted,
              };

              const options = {
                expiresIn: "60m",
              };

              const token = jwt.sign(payload, SECRET, options);

              res.status(200).json({ result, token });
            } else {
              res
                .status(400)
                .json({ message: "Invalid Email/Username or Password!!" });
            }
          } else {
            res
              .status(400)
              .json({ message: "Invalid Email/Username or Password!!" });
          }
        } else {
          res
            .status(404)
            .json({ message: "This user is deactivated you can't login!!" });
        }
      } else {
        res.status(404).json({ message: "Email/Username does not exist!!" });
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const getUsers = (req, res) => {
  usersModel
    .find({ deleted: false })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const deleteAccount = (req, res) => {
  usersModel
    .findByIdAndUpdate(req.token.id, { deleted: true })
    .then((result) => {
      if (result) {
        postsModel
          .updateMany(
            { createdBy: req.token.id, deleted: false },
            { deleted: true }
          )
          .then(() => {
            console.log(
              `All the posts for user:${req.token.username} has been deleted`
            );
          })
          .catch((err) => {
            console.log(err);
          });
        commentsModel
          .updateMany(
            { createdBy: req.token.id, deleted: false },
            { deleted: true }
          )
          .then(() => {
            console.log(
              `All the comments for user:${req.token.username} has been deleted`
            );
          })
          .catch((err) => {
            console.log(err);
          });
        likesModel
          .updateMany({ createdBy: req.token.id, like: true }, { like: false })
          .then(() => {
            console.log(
              `All the likes for user:${req.token.username} has been deleted`
            );
          })
          .catch((err) => {
            console.log(err);
          });
        res.status(200).json({ message: "User has been deleted successfully" });
      } else {
        res
          .status(404)
          .json({ message: `There is no user with this ID: ${id}` });
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const deleteUser = (req, res) => {
  const { id } = req.params;

  usersModel
    .findByIdAndUpdate(id, { deleted: true })
    .then((result) => {
      if (result) {
        postsModel
          .updateMany(
            { createdBy: id, deleted: false },
            { deleted: true }
          )
          .then(() => {
            console.log(
              `All the posts for user:${id} has been deleted`
            );
          })
          .catch((err) => {
            console.log(err);
          });
        commentsModel
          .updateMany(
            { createdBy: id, deleted: false },
            { deleted: true }
          )
          .then(() => {
            console.log(
              `All the comments for user:${id} has been deleted`
            );
          })
          .catch((err) => {
            console.log(err);
          });
        likesModel
          .updateMany({ createdBy: id, like: true }, { like: false })
          .then(() => {
            console.log(
              `All the likes for user:${id} has been deleted`
            );
          })
          .catch((err) => {
            console.log(err);
          });
        res.status(200).json({ message: "User has been deleted successfully" });
      } else {
        res
          .status(404)
          .json({ message: `There is no user with this ID: ${id}` });
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = { signup, login, getUsers, deleteAccount, deleteUser };
