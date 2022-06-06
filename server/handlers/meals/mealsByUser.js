'use strict';

const { sendResponse } = require("../../lib/utils/sendResponse");

// TODO: NEEDS LOTS OF WORK

const mealsByUser = async (req, res) => {
  // Connect to mongo client
  const { clientDb } = res.locals;

  try {
    // Connect to DB:
    const db = clientDb.db("dinnerSwap");

    // Connect to collection:
    // TODO: add the filter by user id. 
    const meals = await db.collection("meals").find().toArray;


    sendResponse(res, 200, meals);
  } catch (err) {
    console.log(err);
  } finally {
    // Close connection
    clientDb.close();
  }
};

module.exports = mealsByUser;