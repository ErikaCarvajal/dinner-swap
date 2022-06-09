const addComment = async (req, res) => {
  // Connect to mongo client
  const { clientDb } = res.locals;

  try {
    // Connect to DB:
    const db = clientDb.db("dinnerSwap");

    let ObjectID = require("mongodb").ObjectId;

    const { mealId } = req.body;
    const date = new Date();

    const mealArray = await db
      .collection("meals")
      .find({ _id: new ObjectID(mealId) })
      .toArray();

    const { comments } = mealArray[0];
    comments.unshift(req.body);

    const query = { _id: new ObjectID(mealId) };
    const updateObj = { $set: { mealArray } };
    const meal = await db.collection("meals").updateOne(query, updateObj);

    sendResponse(res, 200, meal);
  } catch (err) {
    console.log(err);
  } finally {
    clientDb.close();
  }
};

module.exports = addComment;
