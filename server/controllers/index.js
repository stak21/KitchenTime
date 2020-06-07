const db = require("../db");

const createUser = (req, res) => {
  const { name, email, password } = req.body;
  const queryString =
    "INSERT INTO users (name, email, password) VALUES (?, ? , ?)";
  db.query(queryString, [name, email, password], (err, string) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(201);
    }
  });
};

module.exports = {
  createUser,
};
