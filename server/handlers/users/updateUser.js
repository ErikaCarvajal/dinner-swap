"use strict";

const { sendResponse } = require("../../lib/utils/sendResponse");

const updateUser = async (req, res) => {
  // Connect to mongo client
  const { clientDb } = res.locals;

  try {
    // Connect to DB:
    const db = clientDb.db("dinnerSwap");

    // Connect to collection:
    // Get email from params and information to change from req.body
    // Send info to DB as an update.
    const query = req.params;
    const updateObj = { $set: req.body };
    const user = await db.collection("users").updateOne(query, updateObj);

    user.acknowledged
      ? sendResponse(res, 200, user, "User information was updated")
      : sendResponse(res, 200, "User couldn't be reached");
  } catch (err) {
    console.log(err);
  } finally {
    // Close connection
    clientDb.close();
  }
};

module.exports = updateUser;
