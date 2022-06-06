// Reads cloudinary env variable
// require("dotenv").config();

// const cloudinary = require('cloudinary').v2;

// Node.js SDK uploader function
// cloudinary.uploader
// .upload

// import { v2 as cloudinary } from 'cloudinary';
import { useState } from "react";
import styled, { ThemeConsumer } from "styled-components";

const MealImage = ({ previewSource, setPreviewSource }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [image, setImage] = useState("");
  const [inputFile, setInputFile] = useState("");

  const [fileInputState, setFileInputState] = useState("");

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
        {/* <Button type="submit">Submit</Button> */}
      </form>
      {previewSource && (
        <img src={previewSource} alt="chosen" style={{ height: "300px" }} />
      )}
    </>
  );
};

export default MealImage;

const Button = styled.button`
  background-color: blue;
  color: white;
`;
