// const options = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };

const { sendResponse } = require("../lib/utils/sendResponse");
const { cloudinary } = require("../lib/cloudinary");
const { uploadImgToCloudinary } = require("../lib/utils/uploadImgToCloudinary");

let localVariable = "";
// Receive Image input

const addMeal = async (req, res) => {
  // Connect to mongo client
  const { clientDb } = res.locals;

  try {
    const fileStr = req.body.data;

    // Connect to DB:
    const db = clientDb.db("dinnerSwap");

    const { name, points } = req.body;
    const {
      result: { secure_url, public_id },
      error,
    } = await uploadImgToCloudinary(fileStr);

    console.log(secure_url, public_id);

    let newMeal = { name, points, secure_url, public_id };

    // Connect to collection:
    const meals = await db.collection("meals").insertOne(newMeal);
    // test connection to db:
    // console.log("from BE addMeals - meals", meals);
    // console.log("local Variable from addMeal", localVariable);
    // console.log("BE addMeals req.body  ", req.body);
    // // test request:
    // console.log(req.body);

    sendResponse(res, 200, meals);
  } catch (err) {
    console.log(err);
  } finally {
    // Close connection
    clientDb.close();
  }
};

module.exports = { addMeal };
