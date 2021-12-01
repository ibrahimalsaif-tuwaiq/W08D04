const express = require("express");

const { signup, login, getUsers, deleteUser } = require("../controllers/users");

const usersRouter = express.Router();

usersRouter.post("/signup", signup);
usersRouter.post("/login", login);
usersRouter.get("/users", getUsers);
usersRouter.delete("/users/:id", deleteUser);

module.exports = usersRouter; 