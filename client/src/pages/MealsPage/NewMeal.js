import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MealImage from "../../components/MealInput";
import { UserContext } from "../../components/UserContext";
import styled from "styled-components";

export const NewMeal = ({ method }) => {
  const { id: userId } = useContext(UserContext);
  const [completeMeal, setCompleteMeal] = useState({
    name: "",
    points: "",
    description: "",
    contains: "",
    daysAvailable: "",
    servings: "",
    timeRequired: "",
  });
  const [previewSource, setPreviewSource] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    const key = e.target.name;
    const value = e.target.value;
    setCompleteMeal({ ...completeMeal, [key]: value });
  };

  // const handlePoints = (e) => {
  //   setPoints(e.target.value);
  // };

  // Look into Axios package
  const handleSubmit = (e) => {
    e.preventDefault();
      fetch(`/api/meal/add`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          completeMeal,
          userId,
          data: previewSource,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    }

  return (
    <>
      <h1>New Meal</h1>
      <Div>
        <MealImage
          previewSource={previewSource}
          setPreviewSource={setPreviewSource}
        />
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" onChange={(e) => handleChange(e)} />

          <label htmlFor="points">Points</label>
          <input
            type="number"
            name="points"
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            onChange={(e) => handleChange(e)}
          />

          <label htmlFor="contains">Contains</label>
          <input
            type="text"
            name="contains"
            onChange={(e) => handleChange(e)}
          />

          <label htmlFor="">Days Available</label>
          <input
            type="text"
            name="daysAvailable"
            onChange={(e) => handleChange(e)}
          />

          <label htmlFor="servings">Servings</label>
          <input
            type="text"
            name="servings"
            onChange={(e) => handleChange(e)}
          />

          <label htmlFor="time-required">Time-required</label>
          <input
            type="text"
            name="timeRequired"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">{method}</button>
        </form>
      </Div>
    </>
  );
};

const Div = styled.div`
  display: flex;
  flex-direction: column;
`;
