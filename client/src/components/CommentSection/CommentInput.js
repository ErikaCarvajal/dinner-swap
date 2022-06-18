import { useState } from "react";
import styled from "styled-components";

const CommentInput = ({
  userId,
  mealId,
  userName,
  isEditing,
  setIsEditing,
}) => {
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleContent = (e) => {
    setComment(e.target.value);
  };

  const date = new Date();

  const handleSubmit = (e) => {
    e.preventDefault();

    const queryObj = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        title,
        comment,
        userName,
        mealId,
        userId,
        date,
      }),
    };

    fetch(`/api/comment/`, queryObj)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // setIsEditing(!isEditing);
      });
  };

  return (
    <Wrapper>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="title">Comment Title</label>
        <input
          type="text"
          name="title"
          id="title"
          onChange={(e) => {
            handleTitle(e);
          }}
        />
        <label htmlFor="content">Content</label>
        <textarea
          name="content"
          id="content"
          rows="3"
          cols="50"
          onChange={(e) => {
            handleContent(e);
          }}
        />
        {/* <input
          type="text"
          name="content"
          id="content"
          onChange={(e) => {
            handleContent(e);
          }}
        /> */}
        <Input type="submit" value="Submit" />
      </form>
    </Wrapper>
  );
};

export default CommentInput;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: var(--secondary-color);
  margin: 80px auto;
  width: 50%;
  box-shadow: 1px 8px 12px 0 black;
  padding: 12px 25px;
  position: relative;

  label {
    color: var(--primary-color);
    font-family: var(--heading-font-family);
    font-weight: bolder;
    display: flex;
  }

  input {
    width: 50%;
    border: 1px solid var(--primary-color);
  }

  textarea {
    border: 1px solid var(--primary-color);
  }
`;

const Input = styled.input`
  font-family: var(--heading-font-family);
  background-color: var(--primary-color);
  color: var(--secondary-color);
  padding: 5px 5px;
  border-radius: 1em;
  border: none;
  cursor: pointer;
  margin-top: 10px;
  font-size: 20px;

  :hover {
    background-color: var(--thirdary-color);
    color: var(--secondary-color);
  }
`;
