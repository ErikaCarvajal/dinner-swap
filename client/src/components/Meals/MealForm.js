import styled from "styled-components";

import { useState, useContext } from "react";
import { UserContext } from "../../components/UserContext";
import MealImage from "../MealImage";
import { handleErrorMessages } from "./MealErrorMessages";
import Wrapper from "./MealWrapper";
import { useNavigate } from "react-router-dom";
import Error from "../../pages/Error";

const MealForm = ({ oldMealData, setIsEditing, mealId, method }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [previewSource, setPreviewSource] = useState("");

  const initialState = {
    name: "",
    points: 0,
    secure_url: "",
    description: "",
    contains: "",
    daysAvailable: "",
    servings: 0,
    daysInAdvance: 0,
    userId: user._id,
  };

  const {
    name,
    points,
    secure_url,
    description,
    contains,
    daysAvailable,
    servings,
    daysInAdvance,
    userId,
  } = oldMealData || initialState;

  const [mealToBeUpdated, setMealToBeUpdated] = useState(
    oldMealData || initialState
  );

  const [error, setError] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    // setError(null);
    const key = e.target.name;
    const value = e.target.value;
    setMealToBeUpdated({ ...mealToBeUpdated, [key]: value });
    handleErrorMessages(mealToBeUpdated, setError);
    console.log("inside handleChange -error is", error);
  };

  // const handleOnBlur = () => { }

  const handleSubmit = (e) => {
    e.preventDefault();
    const completeMeal = {
      name: mealToBeUpdated.name,
      points: mealToBeUpdated.points,
      description: mealToBeUpdated.description,
      daysInAdvance: mealToBeUpdated.daysInAdvance,
      servings: mealToBeUpdated.servings,
      contains: mealToBeUpdated.contains,
      daysAvailable: mealToBeUpdated.daysAvailable,
      secure_url: mealToBeUpdated.secure_url,
      public_id: mealToBeUpdated.public_id,
      userId: mealToBeUpdated.userId,
      imgData: previewSource,
    };
    
    if (oldMealData) {
      // Validate user's input
      handleErrorMessages(mealToBeUpdated, setError);

      if (!error) {
        fetch(`/api/meal/${mealId}`, {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(completeMeal),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.status === 200) {
              console.log(data);
              setIsEditing(false);
            }
          })
          .catch((err) => {
            console.log(err);
            setError(true);
          });
      }
    } else {
      if (Object.keys(previewSource).length !== 0) {
        console.log("true for  fetch");
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
            navigate("/meals");
          })
          .catch((err) => console.log(err));
      }
    }
  };

  return (
    <>
      <Wrapper>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Div>
            {error && <Error errorMessage={"Uh oh something done goofed"} />}
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
          {/* <NameInput element="input" type="text" label="Name" validators={[validatorInput()]} error="Please enter a valid name"/> */}
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={mealToBeUpdated.name}
            onChange={(e) => handleChange(e)}
            required="true"
            pattern="^[^\s]+(\s+[^\s]+)*$"
          />

          <label htmlFor="points">Points</label>
          <input
            type="number"
            id="points"
            name="points"
            value={mealToBeUpdated.points}
            onChange={(e) => {
              handleChange(e);
            }}
            required
          />

          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={mealToBeUpdated.description}
            onChange={(e) => {
              handleChange(e);
            }}
            required
          />

          <label htmlFor="contains">Contains</label>
          <input
            type="text"
            id="contains"
            name="contains"
            value={mealToBeUpdated.contains}
            onChange={(e) => {
              handleChange(e);
            }}
            required
          />

          <label htmlFor="daysAvailable">daysAvailable</label>
          <input
            type="text"
            value={mealToBeUpdated.daysAvailable}
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
            value={mealToBeUpdated.servings}
            id="servings"
            name="servings"
            onChange={(e) => {
              handleChange(e);
            }}
            required
          />

          <label htmlFor="daysInAdvance">Time-required</label>
          <input
            type="number"
            value={mealToBeUpdated.daysInAdvance}
            id="daysInAdvance"
            name="daysInAdvance"
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
            <input type="submit" value={method} />
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
