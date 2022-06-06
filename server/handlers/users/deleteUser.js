'use strict';

const { sendResponse } = require("../../lib/utils/sendResponse");

// TODO: BASIC SETTING

const deleteUser = async (req, res) => {
  // Connect to mongo client
  const { clientDb } = res.locals;

  try {
    // Connect to DB:
    const db = clientDb.db("dinnerSwap");

    // Connect to collection 
    const user = await db.collection("users").deleteOne(req.params);

    user.acknowledge ?
    sendResponse(res, 200, user, "Account was deleted")
    : sendResponse(res, 400, "There was an error and the account couldn't be remove")
  } catch (err) {
    console.log(err);
  } finally {
    // Close connection
    clientDb.close();
  }
};

module.exports = deleteUser;