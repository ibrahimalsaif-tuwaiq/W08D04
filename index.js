const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
require("./db");
require("./Config/passport");

// Config .env file
dotenv.config();

// Iinitiating the app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(
  session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Roles Router
const rolesRouter = require("./routers/routes/roles");
app.use(rolesRouter);

// Users Router
const usersRouter = require("./routers/routes/users");
app.use(usersRouter);

// Posts Router
const postsRouter = require("./routers/routes/posts");
app.use(postsRouter);

// Comments Router
const commentsRouter = require("./routers/routes/comments");
app.use(commentsRouter);

// Get PORT variable from .env
const PORT = process.env.PORT;

// Start the app
app.listen(PORT, () => {
  console.log(`SERVER ON PORT ${PORT}`);
});
