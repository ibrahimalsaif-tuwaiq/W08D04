const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
require("./db");

// Config .env file
dotenv.config();

// Iinitiating the app
const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Roles Router
const rolesRouter = require("./routers/routes/roles");
app.use(rolesRouter);

// Get PORT variable from .env
const PORT = process.env.PORT;

// Start the app
app.listen(PORT, () => {
  console.log(`SERVER ON PORT ${PORT}`);
});