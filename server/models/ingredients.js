const db = require("../db");
/*
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(100) NOT NULL,
	type VARCHAR(50) DEFAULT 'Other',
	aisle VARCHAR(256),
	unit VARCHAR(10),
	unit_short VARCHAR(50)
*/

const create = (data) => {
  return new Promise((resolve, reject) => {
    const keys = Object.keys(data);
    const values = keys.map((key) => data[key]);

    const queryString = `
        INSERT INTO ingredients (${keys.join(", ")}) 
        VALUES ('${values.join("', '")}')
        `;

    db.query(queryString, (err, response) => {
      if (err) {
        return reject(err);
      } else {
        resolve(response);
      }
    });
  });
};

const get = (data) => {
  return new Promise((resolve, reject) => {
    const { name } = data;

    const queryString = `SELECT name from ingredients where name=${name}`;

    db.query(queryString, (err, response) => {
      console.log(err, response);
      if (err) {
        return reject(err);
      } else {
        resolve(response);
      }
    });
  });
};

const joinUser = (ingredient_id, user_id, type) => {
  return new Promise((resolve, reject) => {
    const queryString =
      "INSERT INTO user_ingredients (user_id, ingredient_id, type) VALUES (?, ?, ?)";

    db.query(queryString, [user_id, ingredient_id, type], (err, results) => {
      if (err) {
        return reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = {
  create,
  get,
  joinUser,
};
