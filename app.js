const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv/config");
//Routes Imports
const userRoute = require("./modules/user/user.controller");

//Middlewares
app.use(bodyParser.json());

//Routing Middlewares
app.use("/api/users", userRoute);

//Home Route
app.get("/api", (req, res) => {
  res.json({
    message: `for user related operations go to '/api/users' `,
  });
});
app.get("/", (req, res) => {
  res.json({
    message: `for user related operations go to '/api/users' `,
  });
});

module.exports = app;
