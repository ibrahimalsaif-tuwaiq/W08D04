const express = require("express");

const { getRoles, createRole } = require("../controllers/roles");

const rolesRouter = express.Router();

rolesRouter.get("/roles", getRoles);
rolesRouter.post("/createRole", createRole);

module.exports = rolesRouter;
