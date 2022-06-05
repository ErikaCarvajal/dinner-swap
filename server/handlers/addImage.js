// const options = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };

const { sendResponse } = require("../lib/utils");
const { cloudinary } = require("../lib/cloudinary");

let localVariable = "";
// Receive Image input
const addImage = async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "cuweodxj",
    });
    // const imgUrl = uploadedResponse.url;
    localVariable = uploadedResponse;

    if (uploadedResponse) {
      sendResponse(res, 200, uploadedResponse, "All clear")
    } else {
      sendResponse(res, 404, "Couldn't create new meal")
    }
    // sendResponse(res, 200, uploadedResponse, "Mmmmm yummy!!");

  } catch (err) {
    console.log(err);
    sendResponse(res, 500, err, "Something went wrong with image upload");
  }

};

const addMeal = async (req, res) => {
  // Connect to mongo client
  const {clientDb} = res.locals;
  
  try {
      // Connect to DB:
      const db = clientDb.db("dinnerSwap");

      const { name, points } = req.body;
      const { secure_url, public_id} = localVariable;

      let newMeal = {name, points, secure_url, public_id};

      // Connect to collection:
      const meals = await db.collection("meals").insertOne(newMeal);
      // test connection to db:
      console.log("from BE addMeals - meals", meals);
      console.log("local Variable from addMeal", localVariable)
      console.log("BE addMeals req.body  ", req.body)
      // test request:
      console.log(req.body)

      sendResponse(res, 200, meals, )
  } catch (err) {
      console.log(err)
  } finally {
      // Close connection
      clientDb.close()
  }
};

module.exports = { addImage, addMeal };
