const { uploadImgToCloudinary } = require("./uploadImgToCloudinary");

const updateImage = async (newImgData, oldUrl, oldId) => {
  let newImgUpload;
  if (newImgData) {
    newImgUpload = await uploadImgToCloudinary(newImgData);
  }
  if (newImgUpload) {
    console.log("1st");
    return newImgUpload.result;
  } else {
    return { secure_url: oldUrl, public_id: oldId };
  }
};

module.exports = { updateImage };
