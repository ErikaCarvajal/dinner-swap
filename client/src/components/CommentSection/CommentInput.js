import { useState } from "react";

const CommentInput = ({ userId, mealId }) => {
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleContent = (e) => {
    setComment(e.target.value);
  };

  const date = new Date()

  const handleSubmit = (e) => {
    e.preventDefault();

    const queryObj = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        title,
        comment,
        mealId,
        userId,
        date,
      }),
    };

    fetch(`/api/comment/`, queryObj)
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <>
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
        <lable htmlFor="content">Content</lable>
        <input
          type="text"
          name="content"
          id="content"
          onChange={(e) => {
            handleContent(e);
          }}
        />
        <input type="submit" value="Submit" />
      </form>
    </>
  );
};

export default CommentInput;

// Inside MongoDB meals collection

// meal = {
//   timeRequired: 2,
//   name: "Cookies",
//   comments: [
//     {
//       commentName: "Best cookies ever!!!",
//       rating: 5,
//       author: "user12345",
//       content: "This is by far the best cookies I've ever had!!!",
//       createdDate: "2022-06-08",
//     },
//     {
//       commentName: "Best cookies ever!!!",
//       rating: 5,
//       author: "user12345",
//       content: "This is by far the best cookies I've ever had!!!",
//       createdDate: "2022-06-08",
//     },
//     {
//       commentName: "Best cookies ever!!!",
//       author: "user12345",
//       content: "This is by far the best cookies I've ever had!!!",
//       createdDate: "2022-06-09",
//     },
//     {
//       commentName: "Best cookies ever!!!",
//       author: "user12345",
//       content: "This is by far the best cookies I've ever had!!!",
//       createdDate: "2022-06-10",
//     },
//     {
//       commentName: "Best cookies ever!!!",
//       author: "user12345",
//       content: "This is by far the best cookies I've ever had!!!",
//       createdDate: "2022-06-10",
//     },
//   ],
// };
