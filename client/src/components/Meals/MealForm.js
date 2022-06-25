import styled from "styled-components";

import { useState, useContext } from "react";
import { UserContext } from "../../components/UserContext";
import MealImage from "../MealImage";
import { handleErrorMessages } from "./MealErrorMessages";
import { useNavigate, useLocation } from "react-router-dom";
import Error from "../../pages/Error";

const MealForm = ({ oldMealData, isEditing, setIsEditing, mealId, method }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
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
    chef: user.name,
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
    chef,
  } = oldMealData || initialState;

  const [mealToBeUpdated, setMealToBeUpdated] = useState(
    oldMealData || initialState
  );

  const [error, setError] = useState(false);
  const handleChange = (e) => {
    e.preventDefault();
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
      chef: mealToBeUpdated.chef,
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
            {method === "Update" && (
              <div>
                Current Image
                <Img src={secure_url} />
              </div>
            )}
            <div>
              <h1>New image</h1>
              <MealImage
                previewSource={previewSource}
                setPreviewSource={setPreviewSource}
              />
            </div>
          </Div>
          {/* <NameInput element="input" type="text" label="Name" validators={[validatorInput()]} error="Please enter a valid name"/> */}
          <Div2>
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
          </Div2>

          <Div2>
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
          </Div2>
          <Div2>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              row="4"
              column="50"
              value={mealToBeUpdated.description}
              onChange={(e) => {
                handleChange(e);
              }}
              required
            />
          </Div2>
          <Div2>
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
          </Div2>
          <Div2>
            <label htmlFor="daysAvailable">Days Available</label>
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
          </Div2>
          <Div2>
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
          </Div2>
          <Div2>
            <label htmlFor="daysInAdvance">Required notice (days)</label>
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
          </Div2>
          <div>
            <Input
              type="button"
              value="Cancel"
              onClick={() => {
                if (isEditing === undefined) {
                  navigate(-1);
                } else {
                  setIsEditing(!isEditing);
                }
              }}
            />
            {error && <p>{error}</p>}
            <Input type="submit" value={method} />
          </div>
        </Form>
      </Wrapper>
    </>
  );
};

export default MealForm;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: var(--secondary-color);
  margin: 80px auto;
  width: 50%;
  box-shadow: 1px 8px 12px 0 black;
  padding: 12px 25px;
  position: relative;

  h1 {
    margin-bottom: 10px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-content: space-between;
  align-items: flex-end;
`;

const Img = styled.img`
  width: 100px;
  height: 100px;
  margin: 10px;
`;

const Div = styled.div`
  display: flex;
  column-gap: 100px;
  align-content: center;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const Div2 = styled.div`
  display: flex;
  /* flex-direction: row; */
  justify-content: flex-start;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 10px;

  label {
    color: var(--primary-color);
    font-family: var(--heading-font-family);
    margin-right: 5px;
    padding-bottom: 10px;
  }

  input {
    margin-left: 5px;
    width: 250px;
  }

  textarea {
    width: 250px;
  }
`;

const Input = styled.input`
  font-family: var(--heading-font-family);
  background-color: var(--primary-color);
  color: var(--secondary-color);
  padding: 5px 15px;
  border-radius: 1em;
  border: none;
  cursor: pointer;
  margin-top: 20px;
  font-size: 20px;

  :hover {
    background-color: var(--tertiary-color);
    color: var(--secondary-color);
  }
`;
