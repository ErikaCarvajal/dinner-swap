const { sendResponse } = require("../../lib/utils/sendResponse");

const addComment = async (req, res) => {
  // Connect to mongo client
  const { clientDb } = res.locals;

  try {
    // Connect to DB:
    const db = clientDb.db("dinnerSwap");

    let ObjectID = require("mongodb").ObjectId;

    const { mealId, title, userName, comment, userId, date } = req.body;

    // const commentsArray = req.body;

    // const mealArray = await db
    //   .collection("meals")
    //   .find({ _id: new ObjectID(mealId) }, { projection: { comments: 1 } })
    //   .toArray();

    const query = { _id: new ObjectID(mealId) };
    const updateObj = {
      $push: { comments: { title, comment, userName, mealId, userId, date } },
    };
    const meal = await db.collection("meals").updateOne(query, updateObj);

    clientDb.close();
    if (meal.acknowledged) {
      sendResponse(res, 200, meal, "Comment update successfull");
    } else {
      sendResponse(res, 400, "Sorry, could not update this meal");
    }
  } catch (err) {
    console.log(err);
  } finally {
    clientDb.close();
  }
};

module.exports = addComment;
