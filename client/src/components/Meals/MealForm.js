import styled from "styled-components";

import { useState, useContext } from "react";
import { UserContext } from "../../components/UserContext";
import MealImage from "../../components/MealInput";

const MealForm = ({ oldMealData, setIsEditing, mealId }) => {
  const { id: userId } = useContext(UserContext);
  const [previewSource, setPreviewSource] = useState("");
  const {
    name,
    points,
    secure_url,
    description,
    contains,
    daysAvailable,
    servings,
    timeRequired,
  } = oldMealData;

  const initialValue = oldMealData;

  const [mealToBeUpdated, setMealToBeUpdated] = useState(initialValue);

  const handleChange = (e) => {
    e.preventDefault();
    const key = e.target.name;
    const value = e.target.value;
    setMealToBeUpdated({ ...mealToBeUpdated, [key]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`/api/meal/${mealId}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        mealToBeUpdated,
        userId,
        // data: previewSource,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  return (
    <>
    <MealImage
          previewSource={previewSource}
          setPreviewSource={setPreviewSource}
        />
      <Img src={secure_url} />
    <Form onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        placeholder={name}
        id="name"
        name="name"
        onChange={(e) => {
          handleChange(e);
        }}
      />

      <label htmlFor="points">Points</label>
      <input
        type="number"
        placeholder={points}
        id="points"
        name="points"
        onChange={(e) => {
          handleChange(e);
        }}
      />

      <label htmlFor="">Image Upload</label>
      <input type="" id="" name="" />

      <label htmlFor="description">Description</label>
      <input
        type="text"
        id="description"
        placeholder={description}
        name="description"
        onChange={(e) => {
          handleChange(e);
        }}
      />

      <label htmlFor="contains">Contains</label>
      <input
        type="text"
        placeholder={contains}
        id="contains"
        name="contains"
        onChange={(e) => {
          handleChange(e);
        }}
      />

      <label htmlFor="">Days Available</label>
      <input
        type="text"
        placeholder={daysAvailable}
        id="days-available"
        name="days-available"
        onChange={(e) => {
          handleChange(e);
        }}
      />

      <label htmlFor="servings">Servings</label>
      <input
        type="number"
        placeholder={servings}
        id="servings"
        name="servings"
        onChange={(e) => {
          handleChange(e);
        }}
      />

      <label htmlFor="time-required">Time-required</label>
      <input
        type="text"
        placeholder={timeRequired}
        id="time-required"
        name="time-required"
        onChange={(e) => {
          handleChange(e);
        }}
      />

      <input
        type="button"
        value="Cancel"
        onClick={() => {
          setIsEditing(false);
        }}
      />

      <input type="button" value="Save" onClick="submit" />
    </Form>
    </>
  );
};

// TODO: Add handleSubmit to request BE to update the meal to the Save button

export default MealForm;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Img = styled.img`
  width: 500px;
  height: 500px;
  margin: 10px;
`;
