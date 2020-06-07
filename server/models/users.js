const db = require("../db");

const create = (data) => {
  return new Promise((resolve, reject) => {
    const { name, email, password } = data;
    const queryString =
      "INSERT INTO users (name, email, password) VALUES (?, ? , ?)";
    db.query(queryString, [name, email, password], (err, response) => {
      if (err) {
        return reject(err);
      } else {
        resolve(response);
      }
    });
  });
};

module.exports = {
  create,
};
