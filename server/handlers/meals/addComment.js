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
   
    // const mealArray2 = await db
    //   .collection("meals")
    //   .find({ _id: new ObjectID(mealId) })
    //   .toArray();

    // mealArray2.map((item) => console.log("from map", item.comments))  //comments object
    // const newComArray = mealArray2.map((item) => item.comments ? item.comments.push(commentsArray) : item)

    // const query = ({ _id: new ObjectID(mealId) });
    // const meal = await db.collection("meals").replaceOne(query, newComArray);

    // const { comments } = mealArray[0];
    // comments.unshift(req.body);

    // const updateObj = { $set: { title: title, comment: comment } };
    // const meal = await db.collection("meals").updateOne(query, updateObj);

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
