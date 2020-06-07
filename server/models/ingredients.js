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

module.exports = {
  create,
};
