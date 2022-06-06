const { cloudinary } = require("../cloudinary");

const uploadImgToCloudinary = async (fileStr) => {
  const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
    upload_preset: "cuweodxj",
  });

  if (uploadedResponse) {
    return { result: uploadedResponse, error: null };
  } else {
    return { result: null, error: "error-uploading-image" };
  }
};

module.exports = { uploadImgToCloudinary };
