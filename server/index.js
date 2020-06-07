require("./db");
const express = require("express");
const controllers = require("./controllers");

const app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/users", controllers.createUser);

app.listen(port);
