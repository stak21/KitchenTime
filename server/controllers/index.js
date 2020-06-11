const db = require("../db");
const users = require("../models/users");
const ingredients = require("../models/ingredients");
const unirest = require("unirest");

// User
const createUser = (req, res) => {
  const body = req.body;

  users
    .create(body)
    .then((response) => res.status(201).send())
    .catch((err) => res.status(404).send(err));
};

// Ingredient
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

// User Ingredient
const addIngredientToUser = (req, res) => {
  const { ingredientId, userId } = req.params;
  const { type } = req.body;

  ingredients
    .joinUser(ingredientId, userId, type)
    .then((response) => res.status(201).send())
    .catch((err) => res.status(404).send(err));
};

const deleteIngredientToUser = (req, res) => {
  const { ingredientId, userId } = req.params;
  const { type } = req.body;

  ingredients
    .deleteUser(ingredientId, userId)
    .then((response) => res.status(204).send())
    .catch((err) => res.status(404).send(err));
};

const getRecipesByIngredients = (req, res) => {
  const { ingredients } = req.query;

  console.log("ing" + ingredients);

  var request = unirest(
    "GET",
    "https://webknox-recipes.p.rapidapi.com/recipes/findByIngredients"
  );

  request.query({
    number: "5",
    ingredients: ingredients,
  });

  request.headers({
    "x-rapidapi-host": process.env.RAPIDAPI_HOST,
    "x-rapidapi-key": process.env.RAPIDAPI_KEY,
    useQueryString: true,
  });

  request.end(function (result) {
    if (result.error) throw new Error(result.error);
    res.status(200).send(result.body);
  });
};

const searchRecipe = (req, res) => {
  const { q } = req.query;

  const request = unirest(
    "GET",
    "https://webknox-recipes.p.rapidapi.com/recipes/search"
  );

  request.query({
    query: q,
  });

  request.headers({
    "x-rapidapi-host": "webknox-recipes.p.rapidapi.com",
    "x-rapidapi-key": "f697106f5bmshab8fe07ae53f66ep1e22b9jsnba65f8b40899",
    useQueryString: true,
  });

  request.end(function (result) {
    if (result.error) throw new Error(result.error);

    console.log(result.body);
    // const title = q.toLowerCase();
    // const body = result.body.results.filter((recipe) => {
    //   return recipe.title.toLowerCase() === title;
    // })[0];
    const body = result.body.results[0];

    res.status(200).json(body);
  });
};

const searchRecipeByUrl = (req, res) => {
  const { url } = req.query;

  const request = unirest(
    "GET",
    "https://webknox-recipes.p.rapidapi.com/recipes/extract"
  );

  request.query({
    url: url,
  });

  request.headers({
    "x-rapidapi-host": "webknox-recipes.p.rapidapi.com",
    "x-rapidapi-key": "f697106f5bmshab8fe07ae53f66ep1e22b9jsnba65f8b40899",
    useQueryString: true,
  });

  request.end(function (result) {
    if (result.error) throw new Error(result.error);

    res.status(200).json(result.body);
  });
};

module.exports = {
  createUser,
  createIngredient,
  getIngredient,
  addIngredientToUser,
  deleteIngredientToUser,
  getRecipesByIngredients,
  searchRecipe,
  searchRecipeByUrl,
};
