const usersModel = require("./../../db/models/users");
const postsModel = require("./../../db/models/posts");
const commentsModel = require("./../../db/models/comments");
const likesModel = require("./../../db/models/likes");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// Config .env file
dotenv.config();

// Get SALT variable from .env
const SALT = Number(process.env.SALT);

// Get SECRET_KEY variable from .env
const SECRET = process.env.SECRET_KEY;

// Email transport
const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const signup = async (req, res) => {
  const { email, username, password, avatar, role } = req.body;

  const lowerCaseEmail = email.toLowerCase();
  const lowerCaseUsername = username.toLowerCase();

  const userExists = await usersModel.findOne({
    $or: [{ username: lowerCaseUsername }, { email: lowerCaseEmail }],
  });

  if (!userExists) {
    const hashedPassword = await bcrypt.hash(password, SALT);

    let activeCode = "";
    const characters = "0123456789";
    for (let i = 0; i < 4; i++) {
      activeCode += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

    const newUser = new usersModel({
      email: lowerCaseEmail,
      username: lowerCaseUsername,
      password: hashedPassword,
      passwordCode: "",
      activeCode,
      avatar,
      role,
    });

    newUser
      .save()
      .then((result) => {
        transport
          .sendMail({
            from: process.env.EMAIL,
            to: lowerCaseEmail,
            subject: "Please confirm your account",
            html: `<h1>Email Confirmation</h1>
              <h2>Hello ${lowerCaseUsername}</h2>
              <h4>CODE: ${activeCode}</h4>
              <p>Thank you for registering. Please confirm your email by entring the code on the following link</p>
              <a href="https://ibrahim-social-media-project.netlify.app/verify_account/${result._id}"> Click here</a>
              </div>`,
          })
          .catch((err) => console.log(err));
        res.status(201).json(result);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } else {
    res.json({
      message: "Email or Username already taken!",
    });
  }
};

const verifyAccount = async (req, res) => {
  const { id, code } = req.body;

  const user = await usersModel.findOne({ _id: id });

  if (user.activeCode == code) {
    usersModel
      .findByIdAndUpdate(id, { active: true, activeCode: "" }, { new: true })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  } else {
    res.status(400).json("Wrong Code");
  }
};

const checkEmail = async (req, res) => {
  const { email } = req.body;

  const user = await usersModel.findOne({ email });

  if (user) {
    let passwordCode = "";
    const characters = "0123456789";
    for (let i = 0; i < 4; i++) {
      passwordCode += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

    usersModel
      .findByIdAndUpdate(user._id, { passwordCode }, { new: true })
      .then((result) => {
        transport
          .sendMail({
            from: process.env.EMAIL,
            to: result.email,
            subject: "Reset Your Password",
            html: `<h1>Reset Your Password</h1>
              <h2>Hello ${result.username}</h2>
              <h4>CODE: ${passwordCode}</h4>
              <p>Please enter the code on the following link and reset your password</p>
              <a href="https://ibrahim-social-media-project.netlify.app/reset_password/${result._id}"> Click here</a>
              </div>`,
          })
          .catch((err) => console.log(err));
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  } else {
    res.status(400).json("No user with this email");
  }
};

const resetPassword = async (req, res) => {
  const { id, code, password } = req.body;

  const user = await usersModel.findOne({ _id: id });

  if (user.passwordCode == code) {
    const hashedPassword = await bcrypt.hash(password, SALT);

    usersModel
      .findByIdAndUpdate(
        id,
        { password: hashedPassword, passwordCode: "" },
        { new: true }
      )
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  } else {
    res.status(400).json("Wrong Code");
  }
};

const logout = async (req, res) => {
  try {
    req.logout();
    res.status(200).json("user logged out");
  } catch (error) {
    res.status(400).json("somthing went wrong");
  }
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
          if (result.active === true) {
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
              .json({ message: "Your account is not activated please check your email" });
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
          .updateMany({ createdBy: id, deleted: false }, { deleted: true })
          .then(() => {
            console.log(`All the posts for user:${id} has been deleted`);
          })
          .catch((err) => {
            console.log(err);
          });
        commentsModel
          .updateMany({ createdBy: id, deleted: false }, { deleted: true })
          .then(() => {
            console.log(`All the comments for user:${id} has been deleted`);
          })
          .catch((err) => {
            console.log(err);
          });
        likesModel
          .updateMany({ createdBy: id, like: true }, { like: false })
          .then(() => {
            console.log(`All the likes for user:${id} has been deleted`);
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

module.exports = {
  signup,
  verifyAccount,
  checkEmail,
  resetPassword,
  logout,
  login,
  getUsers,
  deleteAccount,
  deleteUser,
};
