"use strict";

// const { ObjectID } = require("bson");
const { sendResponse } = require("../../lib/utils/sendResponse");
const { cloudinary } = require("../../lib/cloudinary");
const {
  uploadImgToCloudinary,
} = require("../../lib/utils/uploadImgToCloudinary");

const updateMeal = async (req, res) => {
  // connect to clientDb
  const { clientDb } = res.locals;
  try {
    const fileStr = req.body.data;
    //============ Prepare Database
    // connect to DB:
    const db = clientDb.db("dinnerSwap");
    // connect to collection:

    //============ Retrieve information from Database
    let ObjectID = require("mongodb").ObjectId;

    const { id: mealId } = req.params;
    const { name, points } = req.body;
    const {
      result: { secure_url, public_id },
      error,
    } = await uploadImgToCloudinary(fileStr);

    // find Meal to be change and set Object with new values
    const query = { _id: ObjectID(mealId) };
    const updateObj = {
      $set: {
        name,
        points,
        secure_url,
        public_id,
      },
    };

    // Connect to collection and update information
    const meal = await db.collection("meals").updateOne(query, updateObj);

    if (meal.acknowledged && meal.modifiedCount === 1) {
      sendResponse(res, 200, meal, "Meal Updated");
    } else {
      console.log(meal);
      sendResponse(res, 400, "Sorry, could not update this meal");
    }
  } catch (err) {
    console.log(err);
  } finally {
    //============ Close db
    clientDb.close();
  }
};

module.exports = updateMeal;
