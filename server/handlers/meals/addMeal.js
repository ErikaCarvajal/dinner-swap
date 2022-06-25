// const options = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };

const { sendResponse } = require("../../lib/utils/sendResponse");
const { cloudinary } = require("../../lib/cloudinary");
const {
  uploadImgToCloudinary,
} = require("../../lib/utils/uploadImgToCloudinary");

const addMeal = async (req, res) => {
  // Connect to mongo client
  const { clientDb } = res.locals;

  try {
    const fileStr = req.body.data;

    // Connect to DB:
    const db = clientDb.db("dinnerSwap");

    const { completeMeal } = req.body;

    const {
      name,
      points,
      description,
      contains,
      daysAvailable,
      servings,
      daysInAdvance,
      userId,
      chef,
    } = completeMeal;
    const {
      result: { secure_url, public_id },
      error,
    } = await uploadImgToCloudinary(fileStr);

    let newMeal = {
      name,
      points,
      description,
      contains,
      daysAvailable,
      servings,
      daysInAdvance,
      userId,
      chef,
      secure_url,
      public_id,
    };

    // Connect to collection:
    const meals = await db.collection("meals").insertOne(newMeal);

    sendResponse(res, 200, meals);
  } catch (err) {
    console.log(err);
  } finally {
    // Close connection
    clientDb.close();
  }
};

module.exports = addMeal;
