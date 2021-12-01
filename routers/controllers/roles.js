const rolesModel = require("./../../db/models/roles");

const getRoles = (req, res) => {
  rolesModel
    .find({})
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const createRole = (req, res) => {
  const { role, permissions } = req.body;

  const newRole = new rolesModel({
    role,
    permissions,
  });

  newRole
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = { getRoles, createRole };
