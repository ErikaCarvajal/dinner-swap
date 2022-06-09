import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import MealImage from "../../components/MealImage";
import { UserContext } from "../../components/UserContext";
import styled from "styled-components";
import Wrapper from "../../components/Meals/MealWrapper";

export const NewMeal = ({ method }) => {
  const { user } = useContext(UserContext);
  console.log(user)
  const userId = "something"
  const navigate = useNavigate();
  const [completeMeal, setCompleteMeal] = useState({
    name: "",
    points: "",
    description: "",
    contains: "",
    daysAvailable: "",
    servings: "",
    timeRequired: "",
    userId: user._id,
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
  // console.log("USER ============ ", user._id)
  // Look into Axios package
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("completeMeal, previewSource & userId from FETCH FE", completeMeal, userId, previewSource)
      fetch(`/api/meal/add`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          completeMeal,
          data: previewSource,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          navigate('/meals')
        })
        .catch((err) => console.log(err));
    }

  return (
    <>
    <Wrapper>
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
            require
          />
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            onChange={(e) => handleChange(e)}
            require
          />

          <label htmlFor="contains">Contains</label>
          <input
            type="text"
            name="contains"
            onChange={(e) => handleChange(e)}
            require
          />

          <label htmlFor="">Days Available</label>
          <input
            type="text"
            name="daysAvailable"
            onChange={(e) => handleChange(e)}
            require
          />

          <label htmlFor="servings">Servings</label>
          <input
            type="text"
            name="servings"
            onChange={(e) => handleChange(e)}
            require
          />

          <label htmlFor="time-required">Time-required</label>
          <input
            type="number"
            name="timeRequired"
            onChange={(e) => handleChange(e)}
            require
          />
          <button type="submit">{method}</button>
        </form>
      </Div>
      </Wrapper>
    </>
  );
};

const Div = styled.div`
  display: flex;
  flex-direction: column;
`;
