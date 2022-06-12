"use strict";

// const { ObjectID } = require("bson");
const { sendResponse } = require("../../lib/utils/sendResponse");
const { cloudinary } = require("../../lib/cloudinary");

const { deleteImage } = require("../../lib/utils/updateImage");
const { deleteImgToCloudinary } = require("../../lib/utils/uploadImgToCloudinary");

const deleteMeal = async (req, res) => {
  // connect to clientDb
  const { clientDb } = res.locals;
  try {
    //============ Prepare Database
    // connect to DB:
    const db = clientDb.db("dinnerSwap");
    // connect to collection:

    //============ Retrieve information from Database
    let ObjectID = require("mongodb").ObjectId;

    console.log("req.body", req.body);
    // 
    const {public_id} = req.body;

    const {response, error} = await deleteImgToCloudinary(public_id);
    console.log(response)
    // console.log("public_id", public_id)
    const id = req.params;
    const query = { _id: new ObjectID(id) };

    const result = await db.collection("meals").deleteOne(query);
    // const result= "nothing";
      // console.log(result)

      if (result.deletedCount === 1) {
          sendResponse(res, 200, result, "Meal was deleted")
      } else {
        sendResponse(res, 404, "Meal doesn't exists");
      }
  } catch (err) {
    console.log(err);
  } finally {
    //============ Close db
    clientDb.close();
  }
};

module.exports = deleteMeal;