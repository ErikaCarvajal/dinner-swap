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
    // console.log("from update user - BE req.body", req.body)
    // const { streetNumber, streetName, city, postCode, province } = req.body.address;
  
    //-  {email: "ecabo.studies@gmail.com"}
    const address = req.body;

    // const userArray = await db
    // .collection("users")
    // .find({ email: (req.params) }, { projection: { address: 1 } })
    // .toArray();

    // const query = { email: (req.params) };
    // const updateObj = { $push: { address } };
    // const user = await db
    // .collection("users")
    // .updateOne(query, updateObj);
   
    console.log(req.params)
    
    const query = req.params;
    const updateObj = { $set: req.body };
    const user = await db.collection("users").updateOne(query, updateObj);
    console.log({user})
    
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
