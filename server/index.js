"use strict";

// Require modules:
const express = require("express");
const morgan = require("morgan");

const port = 8000;

// Require handlers:
const { getHome } = require("./handlers/homeHandlers");
const { getMeals } = require("./handlers/allMeals");
const { getMeal, updateMeal } = require("./handlers/oneMeal");
const { addMeal } = require("./handlers/addImage");

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

  //* USERS Endpoints
  // TODO: Add user endpoints
  // create user in MongoDb
  // get user from MongoDB
  // update user's data
  // delete user's data

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
