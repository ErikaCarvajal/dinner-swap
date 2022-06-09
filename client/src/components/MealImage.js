import { useState } from "react";

const MealImage = ({ previewSource, setPreviewSource }) => {
  const [image, setImage] = useState("");

  const uploadImg = async (e) => {
    console.log(e.target.files[0]);
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
          value={image}
        />
      </form>
      {previewSource && (
        <img src={previewSource} alt="chosen" style={{ height: "300px" }} />
      )}
    </>
  );
};

export default MealImage;
