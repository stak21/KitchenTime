const db = require("../db");
const users = require("../models/users");
const ingredients = require("../models/ingredients");

const createUser = (req, res) => {
  const body = req.body;

  users
    .create(body)
    .then((response) => res.status(201).send())
    .catch((err) => res.status(404).send(err));
};

const createIngredient = (req, res) => {
  const body = req.body;

  ingredients
    .create(body)
    .then((response) => res.status(201).send())
    .catch((err) => res.status(404).send(err));
};

const getIngredient = (req, res) => {
  const query = req.query;

  console.log(query);

  ingredients
    .get(query)
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(404).send(err));
};

const addIngredientToUser = (req, res) => {
  const { ingredientId, userId } = req.params;
  const { type } = req.body;

  ingredients
    .joinUser(ingredientId, userId, type)
    .then((response) => res.status(201).send())
    .catch((err) => res.status(404).send(err));
};

module.exports = {
  createUser,
  createIngredient,
  getIngredient,
  addIngredientToUser,
};
