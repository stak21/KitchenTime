require("./db");
const express = require("express");
const controllers = require("./controllers");

const app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
