DROP DATABASE IF EXISTS kitchen_time;
CREATE DATABASE kitchen_time;

USE kitchen_time;

DROP TABLE IF EXISTS ingredients;
CREATE TABLE ingredients (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(100) NOT NULL,
	type VARCHAR(50) DEFAULT 'Other',
	aisle VARCHAR(256),
	unit VARCHAR(10),
	unit_short VARCHAR(50)
);

DROP TABLE IF EXISTS recipes;
CREATE TABLE recipes (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	title VARCHAR(100) NOT NULL,
	image VARCHAR(100),
	servings TINYINT(1),
	instructions TEXT,
	category VARCHAR(100),
	culture VARCHAR(100),
	gluten_free BOOL,
	vegan BOOL,
	vegetarian BOOL,
	source_url VARCHAR(100)
);

DROP TABLE IF EXISTS users;
CREATE TABLE users (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL,
	password VARCHAR(256) NOT NULL
);



DROP TABLE IF EXISTS user_ingredients;
CREATE TABLE user_ingredients (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	user_id INT(11) NOT NULL,
	ingredient_id INT(11) NOT NULL,
	type VARCHAR(15) NOT NULL,
	Constraint FOREIGN KEY (user_id) references users(id),
	Constraint FOREIGN KEY (ingredient_id) references ingredients(id)
);

DROP TABLE IF EXISTS recipe_ingredients;
CREATE TABLE ingredient_ingredients (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	recipe_id INT(11) NOT NULL,
	ingredient_id INT(11) NOT NULL,
	quantity TINYINT(1),
	Constraint FOREIGN KEY (recipe_id) references recipes(id),
	Constraint FOREIGN KEY (ingredient_id) references ingredients(id)
);
