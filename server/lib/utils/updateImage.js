const { uploadImgToCloudinary } = require("./uploadImgToCloudinary");

const updateImage = async (newImgData, oldUrl, oldId) => {
  let newImgUpload;
  if (newImgData) {
    newImgUpload = await uploadImgToCloudinary(newImgData);
  }
  if (newImgUpload) {
    return newImgUpload.result;
  } else {
    return { secure_url: oldUrl, public_id: oldId };
  }
};

module.exports = { updateImage };
