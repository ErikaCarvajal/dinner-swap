"use strict";

// Require modules:
const express = require("express");
const morgan = require("morgan");

const port = 8000;

// Require handlers:
const getHome = require("./handlers/home");
const getMeals = require("./handlers/meals/allMeals");
const getMeal = require("./handlers/meals/oneMeal");
const addMeal = require("./handlers/meals/addMeal");
const updateMeal = require("./handlers/meals/updateMeal");
const deleteMeal = require("./handlers/meals/deleteMeal");

const getUser = require("./handlers/users/getUser");
const addUser = require("./handlers/users/addUser");
const updateUser = require("./handlers/users/updateUser");
const deleteUser = require("./handlers/users/deleteUser");

const { connectDb } = require("./lib/utils/connectDb");

express()
  .use(morgan("tiny"))
  .use(express.json({ limit: "50mb" }))
  .use(express.static("public"))
  .use(express.urlencoded({ limit: "50mb", extended: true }))
  .use(connectDb)

  //* HOME FEED Endpoints
  .get("/api/home", getHome)

  //* MEALS Endpoints
  .get("/api/meals", getMeals)
  // TODO: .get("/api/meals/:userId", getMealsByUserId)
  .post("/api/meal/add", addMeal)
  .get("/api/meal/:id", getMeal)
  .put("/api/meal/:id", updateMeal)
  .delete("/api/meal/:id", deleteMeal)

  //* USERS Endpoints
  .post("/api/user/add", addUser)
  .get("/api/user/:email", getUser)
  .put("/api/user/:email", updateUser)
  .delete("/api/user/:email", deleteUser)

  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  .listen(port, () => {
    console.log(`App listening on port ${port}`);
  });