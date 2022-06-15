const {sendResponse} = require('../../lib/utils/sendResponse')

const addComment = async (req, res) => {
  // Connect to mongo client
  const { clientDb } = res.locals;

  try {
    // Connect to DB:
    const db = clientDb.db("dinnerSwap");

    let ObjectID = require("mongodb").ObjectId;

    const { mealId, title, comment, userId } = req.body;
    const date = new Date();
    const commentsArray = req.body;

    const mealArray = await db
      .collection("meals")
      .find({ _id: new ObjectID(mealId) }, { projection: { comments: 1 } })
      .toArray();

      
    console.log(mealArray);
    // mealArray.push(commentsArray);
    // console.log("mealArray ", mealArray);

    
    const query = { _id: new ObjectID(mealId) };
    const updateObj = { $push: { comments: { title, comment, mealId, userId, date } } };
    const meal = await db
    .collection("meals")
    .updateOne(query, updateObj);
   
    console.log("meal", meal)
   

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
