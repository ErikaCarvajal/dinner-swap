'use strict';

const { sendResponse } = require("../../lib/utils/sendResponse");

const addUser = async (req, res) => {
  // Connect to mongo client
  const { clientDb } = res.locals;

  try {
    // Connect to DB:
    const db = clientDb.db("dinnerSwap");
    console.log("from BE addUser")
    // Connect to collection:
    console.log(req.body)
    const user = await db.collection("users").insertOne(req.body);

    user.acknowledged ?
    sendResponse(res, 200, user, "User included")
    : sendResponse(res, 400, "User could not be included")
  } catch (err) {
    console.log(err);
  } finally {
    // Close connection
    clientDb.close();
  }
};

module.exports = addUser;