const express = require("express");
const passport = require("passport");
const popupTools = require("popup-tools");

require("./../../Config/passport");

const {
  signup,
  verifyAccount,
  checkEmail,
  resetPassword,
  logout,
  login,
  getUsers,
  deleteAccount,
  deleteUser,
} = require("../controllers/users");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

const usersRouter = express.Router();

usersRouter.post("/signup", signup);
usersRouter.post("/verify_account", verifyAccount);
usersRouter.post("/check_email", checkEmail);
usersRouter.post("/reset_password", resetPassword);
usersRouter.get("/logout", logout);
usersRouter.post("/login", login);
usersRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
usersRouter.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    res.end(popupTools.popupResponse(req.user));
  }
);
usersRouter.get("/users", authentication, authorization, getUsers);
usersRouter.delete("/deleteAccount", authentication, deleteAccount);
usersRouter.delete("/users/:id", authentication, authorization, deleteUser);

module.exports = usersRouter;
