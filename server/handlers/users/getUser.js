"use strict";

const { sendResponse } = require("../../lib/utils/sendResponse");

const getUser = async (req, res) => {
  // Connect to mongo client
  const { clientDb } = res.locals;

  try {
    // Connect to DB:
    const db = clientDb.db("dinnerSwap");

    // Connect to collection:

    // Grab email from params and use it to find the user information
    const userEmail = req.params;
    const user = await db.collection("users").find(userEmail).toArray();

    user.length > 0
      ? sendResponse(res, 200, user, "User retreived")
      : sendResponse(res, 404, "User not found");
  } catch (err) {
    console.log(err);
  } finally {
    // Close connection
    clientDb.close();
  }
};

module.exports = getUser;
