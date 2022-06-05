import { useEffect, useState } from "react";
import MealImage from "../../components/MealInput";

export const NewMeal = () => {
  const [name, setName] = useState("");
  const [points, setPoints] = useState("");
  const [previewSource, setPreviewSource] = useState("");

  const handleChange = (e) => {
    setName(e.target.value)
  };
  const handlePoints = (e) => {
    setPoints(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/meals/new', {
      method: "POST",
      headers: { "content-type": "application/json"},
    body: JSON.stringify({
      name,
      points,
    }), 
  })
  .then((res) => res.json())
  .then((data)=> console.log(data))
  .catch((err)=> console.log(err))
  }


  return (
    <>
      <h1>New Meal</h1>
        <MealImage />
      <form onSubmit={(e)=>handleSubmit(e)}>
        <input type="text" name="name" onChange={(e) => handleChange(e)} />
        <input type="text" name="points" onChange={(e) => handlePoints(e)} />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
