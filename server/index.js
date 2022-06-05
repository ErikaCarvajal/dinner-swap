"use strict";

// Require modules:
const express = require("express");
const morgan = require("morgan");

const port = 8000;

// Require handlers:
const { getHome } = require("./handlers/homeHandlers");
const { getMeals } = require("./handlers/allMeals");
const getMeal = require("./handlers/oneMeal");
const addMeal = require("./handlers/addMeal");
const { addImage } = require("./handlers/addImage");

const { connectDb } = require("./lib/utils");

express()
  .use(morgan("tiny"))
  .use(express.json({ limit: "50mb" }))
  .use(express.static("public"))
  .use(express.urlencoded({ limit: "50mb", extended: true }))
  .use(connectDb)

  .get("/api/home", getHome)
  .get("/api/meals", getMeals)
  .post('/api/meals/new', addMeal)
  .get('/api/meals/:id', getMeal)
  .post("/api/upload", addImage)

  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  .listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
