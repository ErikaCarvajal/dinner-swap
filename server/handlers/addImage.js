// const options = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };

const { sendResponse } = require("../lib/utils");
const { cloudinary } = require("../lib/cloudinary");

// Receive Image input
const addImage = async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "cuweodxj",
    });
    // const imgUrl = uploadedResponse.url;
    console.log(uploadedResponse)
    sendResponse(res, 200, uploadedResponse, "Mmmmm yummy!!");

  } catch (err) {
    console.log(err);
    sendResponse(res, 500, err, "Something went wrong with image upload");
  }

};

module.exports = { addImage };
