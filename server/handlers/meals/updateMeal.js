"use strict";

// const { ObjectID } = require("bson");
const { sendResponse } = require("../../lib/utils/sendResponse");
const { cloudinary } = require("../../lib/cloudinary");
// const {
//   uploadImgToCloudinary,
// } = require("../../lib/utils/uploadImgToCloudinary");
const { ListIndexesCursor } = require("mongodb");
const { updateImage, deleteImage } = require("../../lib/utils/updateImage");

const {
  deleteImgToCloudinary,
} = require("../../lib/utils/uploadImgToCloudinary");

const updateMeal = async (req, res) => {
  console.log("ON UPDATE MEAL HANDLER");
  // connect to clientDb
  const { clientDb } = res.locals;
  try {
    //============ Prepare Database
    // connect to DB:
    const db = clientDb.db("dinnerSwap");
    // connect to collection:
    // console.log(fileStr)
    // 629bc1c64ee674f28b6fc037 checken salad

    //============ Retrieve information from Database
    let ObjectID = require("mongodb").ObjectId;
    // console.log("req.body   ... ", req.body);
    const { id: mealId } = req.params;
    let {
      name,
      points,
      description,
      daysInAdvance,
      servings,
      secure_url: oldUrl,
      public_id: oldId,
      contains,
      daysAvailable,
      userId,
      imgData,
    } = req.body;

    // update secure url and public id if there is a new image uploaded

    // call updateImage to upload new img to Cloudinary if imgData is available
    const { secure_url, public_id } = await updateImage(imgData, oldUrl, oldId);

    // find Meal to be change and set Object with new values
    const query = { _id: ObjectID(mealId) };
    const updateObj = {
      $set: {
        name,
        points,
        description,
        daysInAdvance,
        servings,
        contains,
        daysAvailable,
        userId,
        secure_url,
        public_id,
      },
    };

    // Connect to collection and update information
    const meal = await db.collection("meals").updateOne(query, updateObj);

    if (meal.acknowledged && imgData.length > 0) {
      const { response, error } = await deleteImgToCloudinary(oldId);
      console.log(response, "confirmation from cloudinary");
    }
    console.log(typeof imgData);

    console.log("2nd");

    if (meal.acknowledged && meal.modifiedCount === 1) {
      sendResponse(res, 200, meal, "Meal Updated");
    } else {
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
