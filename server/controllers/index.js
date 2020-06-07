const db = require("../db");
const users = require("../db/models/users");

const createUser = (req, res) => {
  const body = req.body;

  users
    .create(body)
    .then((response) => res.status(201).send())
    .catch((err) => res.status(404).send(err));
};

module.exports = {
  createUser,
};
