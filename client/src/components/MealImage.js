import { useState } from "react";

const MealImage = ({ previewSource, setPreviewSource }) => {
  const [image, setImage] = useState("");

  const uploadImg = async (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  return (
    <>
      <form>
        <input
          type="file"
          name="image"
          onChange={(e) => {
            uploadImg(e);
          }}
        />
      </form>
      {previewSource && (
        <img src={previewSource} alt="chosen" style={{ height: "100px" }} />
      )}
    </>
  );
};

export default MealImage;
