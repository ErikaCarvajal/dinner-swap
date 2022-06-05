"use strict";

// require handlers
const { sendResponse } = require("../lib/utils");

const getMeals = async (req, res) => {
  const { clientDb } = res.locals;
  try {
    // connect to DB
    const db = clientDb.db("dinnerSwap");

    // connect to collection:
    const allMeals = await db.collection("meals").find().toArray();

    console.log(allMeals);
    if (allMeals > 0) {
      sendResponse(res, 200, allMeals, "from all meals");
    } else {
      sendResponse(res, 400, "Couldn't connect with Db");
    }
  } catch (err) {
    sendResponse(res, 500, "Internal server error");
  } finally {
    clientDb.close();
  }
};

module.exports = { getMeals };
