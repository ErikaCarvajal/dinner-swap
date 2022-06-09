import styled from "styled-components";

import { useState, useContext } from "react";
import { UserContext } from "../../components/UserContext";
import MealImage from "../MealImage";
import { handleErrorMessages } from "./MealErrorMessages";
import Wrapper from "./MealWrapper";
import { useNavigate } from "react-router-dom";

const MealForm = ({ oldMealData, setIsEditing, mealId }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
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
    userId,
  } = oldMealData;

  const [mealToBeUpdated, setMealToBeUpdated] = useState(oldMealData);

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    e.preventDefault();
    setError(null);
    const key = e.target.name;
    const value = e.target.value;
    setMealToBeUpdated({ ...mealToBeUpdated, [key]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate user's input
    handleErrorMessages(mealToBeUpdated, setError);

    if (!error) {
      fetch(`/api/meal/${mealId}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: mealToBeUpdated.name,
          points: mealToBeUpdated.points,
          description: mealToBeUpdated.description,
          timeRequired: mealToBeUpdated.timeRequired,
          servings: mealToBeUpdated.servings,
          contains: mealToBeUpdated.contains,
          daysAvailable: mealToBeUpdated.daysAvailable,
          secure_url: mealToBeUpdated.secure_url,
          public_id: mealToBeUpdated.public_id,
          userId: mealToBeUpdated.userId,
          imgData: previewSource,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    }
    navigate("/meals");
  };

  return (
    <>
      <Wrapper>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Div>
            <div>
              Current Image
              <Img src={secure_url} />
            </div>
            <div>
              To update image:
              <MealImage
                previewSource={previewSource}
                setPreviewSource={setPreviewSource}
              />
            </div>
          </Div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder={name}
            id="name"
            name="name"
            onChange={(e) => {
              handleChange(e);
            }}
            required
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
            required
          />

          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            placeholder={description}
            name="description"
            onChange={(e) => {
              handleChange(e);
            }}
            required
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
            required
          />

          <label htmlFor="daysAvailable">daysAvailable</label>
          <input
            type="text"
            placeholder={daysAvailable}
            id="daysAvailable"
            name="daysAvailable"
            onChange={(e) => {
              handleChange(e);
            }}
            required
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
            required
          />

          <label htmlFor="timeRequired">Time-required</label>
          <input
            type="number"
            placeholder={timeRequired}
            id="timeRequired"
            name="timeRequired"
            onChange={(e) => {
              handleChange(e);
            }}
            required
          />

          <div>
            <input
              type="button"
              value="Cancel"
              onClick={() => {
                setIsEditing(false);
              }}
            />
            {error && <p>{error}</p>}
            <input type="submit" value="Update" />
          </div>
        </Form>
      </Wrapper>
    </>
  );
};

export default MealForm;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Img = styled.img`
  width: 50px;
  height: 50px;
  margin: 10px;
`;

const Div = styled.div`
  display: flex;
  column-gap: 100px;
  align-content: center;
  justify-content: center;
  align-items: baseline;
`;
