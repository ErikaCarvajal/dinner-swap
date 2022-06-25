"use strict";

const { sendResponse } = require("../../lib/utils/sendResponse");

const updateUser = async (req, res) => {
  // Connect to mongo client
  const { clientDb } = res.locals;

  try {
    // Connect to DB:
    const db = clientDb.db("dinnerSwap");

    const query = req.params;
    const updateObj = { $set: req.body };
    const user = await db.collection("users").updateOne(query, updateObj);

    user.acknowledged
      ? sendResponse(res, 200, user, "User information was updated")
      : sendResponse(res, 404, "User couldn't be reached");
  } catch (err) {
    console.log(err);
  } finally {
    // Close connection
    clientDb.close();
  }
};

module.exports = updateUser;
