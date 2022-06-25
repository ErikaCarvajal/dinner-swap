"use strict";

const { sendResponse } = require("../../lib/utils/sendResponse");

const addOrder = async (req, res) => {
  // connect to clientDb
  const { clientDb } = res.locals;

  try {
    // connect to DB:
    const db = clientDb.db("dinnerSwap");

    const { user, sold, soldBy, sellerPoints } = req.body;
    const buyerId = user._id;

    let ObjectID = require("mongodb").ObjectId;

    const buyer = await db
      .collection("users")
      .findOne({ _id: ObjectID(user._id) });
    const seller = await db
      .collection("users")
      .findOne({ _id: ObjectID(soldBy) });

    const updateSellersPoints = await db.collection("users").updateOne(
      { _id: ObjectID(soldBy) },
      {
        $set: { points: (seller.points += sellerPoints) },
      }
    );

    const updateBuyersPoints = await db
      .collection("users")
      .updateOne(
        { _id: ObjectID(user._id) },
        { $set: { points: user["points"] } }
      );

    const updatePurchased = await db
      .collection("users")
      .updateOne(
        { _id: ObjectID(user._id) },
        { $push: { purchased: user["purchased"] } }
      );

    const updateSold = await db
      .collection("users")
      .updateOne({ _id: ObjectID(soldBy) }, { $push: { sold } });

    if (
      updateSold.modifiedCount === 1 &&
      updatePurchased.modifiedCount === 1 &&
      updateBuyersPoints.modifiedCount === 1 &&
      updateSellersPoints.modifiedCount === 1
    ) {
      sendResponse(res, 200, "Meal Updated");
    } else {
      sendResponse(res, 400, "Sorry, could not update the users");
    }
  } catch (err) {
    console.log(err);
  } finally {
    //============ Close db
    clientDb.close();
  }
};

module.exports = addOrder;
