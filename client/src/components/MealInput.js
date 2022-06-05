// Reads cloudinary env variable
// require("dotenv").config();

// const cloudinary = require('cloudinary').v2;

// Node.js SDK uploader function
// cloudinary.uploader
// .upload

// import { v2 as cloudinary } from 'cloudinary';
import { useState } from "react";
import styled from "styled-components";

const MealImage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [image, setImage] = useState("");
  const [inputFile, setInputFile] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [fileInputState, setFileInputState] = useState('');
  

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

  const handleSubmit = (e) => {
      console.log("submit")
      e.preventDefault();
      if(!previewSource) return;
      uploadImage(previewSource);
  }

  const uploadImage = async (base64EncodedImage) => {
      console.log("inside uploadImage")
      console.log(base64EncodedImage)
      try {
          await fetch('/api/upload', {
              method: 'POST',
              body: JSON.stringify({data: base64EncodedImage}),
              headers: {'Content-type': 'application/json'}
          })
      } catch (err) {
          console.log(err);
      }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="image"
          onChange={(e) => {
            uploadImg(e);
          }}
          value={image}
        />
        <Button type="submit">Submit</Button>
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
