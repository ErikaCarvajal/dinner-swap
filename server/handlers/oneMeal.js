"use strict";


// const { ObjectID } = require("bson");
const { sendResponse } = require("../lib/utils");

const getMeal = async (req, res) => {
  // connect to clientDb
  const { clientDb } = res.locals;
  try {
    //============ Prepare Database
    // connect to DB:
    const db = clientDb.db("dinnerSwap");
    // connect to collection:

    //============ Retrieve information from Database
    let ObjectID = require("mongodb").ObjectId;
    const id = req.params;
    const meal = await db
      .collection("meals")
      .find({ _id: new ObjectID(id) })
      .toArray();

    meal.length > 0
      ? sendResponse(res, 200, meal, "from one meal")
      : sendResponse(res, 400, "Sorry, that meal id doesn't exists");
  } catch (err) {
    console.log(err);
  } finally {
    //============ Close db
    clientDb.close();
  }
};

module.exports = getMeal;
