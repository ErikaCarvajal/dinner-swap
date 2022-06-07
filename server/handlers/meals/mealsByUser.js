'use strict';

const { sendResponse } = require("../../lib/utils/sendResponse");

const getMealsByUserId = async (req, res) => {
  // Connect to mongo client
  const { clientDb } = res.locals;

  try {
    // Connect to DB:
    const db = clientDb.db("dinnerSwap");

    // Connect to collection:
    const userId = req.params.id;
    console.log("id from req. params ", userId)
    const mealsById = await db.collection("meals").find({ userId: (userId) }).toArray();
    console.log(mealsById)

    sendResponse(res, 200, mealsById, "From meals by id");
  } catch (err) {
    console.log(err);
  } finally {
    // Close connection
    clientDb.close();
  }
};

module.exports = getMealsByUserId;