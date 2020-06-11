require("./db");
const express = require("express");
const controllers = require("./controllers");

const app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log("incoming.... " + req.host);
  next();
});

app.get("/api/recipes", controllers.getRecipesByIngredients);
app.get("/api/recipe", controllers.searchRecipe);
app.get("/api/recipe/url", controllers.searchRecipeByUrl);
app.post("/api/users", controllers.createUser);
app.post("/api/ingredients", controllers.createIngredient);
app.get("/api/ingredients", controllers.getIngredient);
app.post(
  "/api/ingredients/:ingredientId/users/:userId",
  controllers.addIngredientToUser
);
app.delete(
  "/api/ingredients/:ingredientId/users/:userId",
  controllers.deleteIngredientToUser
);

app.listen(port);
