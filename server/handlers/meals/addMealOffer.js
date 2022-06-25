const { sendResponse } = require("../../lib/utils/sendResponse");

const addMealOffer = async (req, res) => {
  // Connect to mongo client
  const { clientDb } = res.locals;

  try {
    // Connect to DB:
    const db = clientDb.db("dinnerSwap");
    let ObjectID = require("mongodb").ObjectId;

    const { offerDate, offerQty, cutOffDate } = req.body.mealOffer;

    const { id } = req.params;
    const query = { _id: new ObjectID(id) };
    const updateObj = { $push: { offer: { offerDate, offerQty, cutOffDate } } };

    const newOffer = await db.collection("meals").updateOne(query, updateObj);

    clientDb.close();
    if (newOffer.acknowledged) {
      sendResponse(res, 200, newOffer, "Meal Offer update successfull");
    } else {
      sendResponse(res, 400, "Sorry, could not update this meal offer");
    }
  } catch (err) {
    console.log(err);
  } finally {
    clientDb.close();
  }
};

module.exports = addMealOffer;
