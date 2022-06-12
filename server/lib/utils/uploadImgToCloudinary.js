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

const deleteImgToCloudinary = async (imgId) => {
  const deletionResponse = await cloudinary.uploader.destroy(imgId)
  if (deletionResponse) {
    return {response: "Deletion confirmed", error: null}
  } else {
    return {response: null, error: "error-deleting-image"}
  }
}

module.exports = { uploadImgToCloudinary, deleteImgToCloudinary };
