import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MealImage from "../../components/MealImage";
import { UserContext } from "../../components/UserContext";
import styled from "styled-components";
import Wrapper from "../../components/Meals/MealWrapper";
import validate from "../../components/Meals/MealValidation";

export const NewMeal = ({ method }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [formError, setFormError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const [completeMeal, setCompleteMeal] = useState({
    name: "",
    points: "",
    description: "",
    contains: "",
    daysAvailable: "",
    servings: "",
    daysInAdvance: "",
    userId: user._id,
  });
  const [previewSource, setPreviewSource] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    // console.log(completeMeal.name);
    const key = e.target.name;
    const value = e.target.value;
    setCompleteMeal({ ...completeMeal, [key]: value });
  };

  const handleBlur = (e) => {
    e.preventDefault();
    const key = e.target.name;
    const value = e.target.value;
    const fieldToCheck = {[key]: value}
    setFormError(`${key} can not be empty`);
  }

  // const handlePoints = (e) => {
  //   setPoints(e.target.value);
  // };
  // console.log("USER ============ ", user._id)



  // Look into Axios package
  const handleSubmit = (e) => {
    e.preventDefault();

    //setFormError(handleErrorMessages(completeMeal)); ======TO BE CHANGE
    console.log("CAN YOU SEE MEE");
    setFormError(validate(completeMeal));
    setIsSubmit(true);

    if (Object.keys(formError).length === 0 && isSubmit && Object.keys(previewSource).length === 0) {
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
  };

  // console.log(previewSource.length);
  useEffect(() => {
    console.log("Form ERROR", formError);
    if (Object.keys(formError).length === 0 && isSubmit && Object.keys(previewSource).length === 0) {
      console.log(completeMeal) // do the fetch
    }
  }, [formError]);

  return (
    <>
      {/* {Object.keys(formError).length === 0 && isSubmit && previewSource} */}
      <pre>{JSON.stringify(completeMeal, undefined, 2)}</pre>
      <Wrapper>
        <h1>New Meal</h1>
        <Div>
          {Object.keys(previewSource).length === 0 ? (
            <>
              <p>Meal image is required</p>
              <MealImage
                previewSource={previewSource}
                setPreviewSource={setPreviewSource}
              />
            </>
          ) : (
            <>
              <MealImage
                previewSource={previewSource}
                setPreviewSource={setPreviewSource}
              />
            </>
          )}

          <FormStyled onSubmit={handleSubmit}>
            <label htmlFor="name">Recipe Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={completeMeal.name}
              onBlur={handleBlur}
            />
            <errorMessageStyled>{formError.name}</errorMessageStyled>

            <label htmlFor="points">Points</label>
            <input
              type="number"
              name="points"
              min="1"
              defaultValue="0"
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
            <errorMessageStyled>{formError.description}</errorMessageStyled>

            <label htmlFor="contains">Contains</label>
            <input
              type="text"
              name="contains"
              onChange={(e) => handleChange(e)}
              require
            />
            <errorMessageStyled>{formError.contains}</errorMessageStyled>
<fieldset>

            <legend>Which days is this meal offered?</legend>
            <input
              type="radio"
              name="daysAvailable"
              id="weekend"
              value="weekend"
              required
            />
            <label htmlFor="weekend">Weekends only</label>

            <input
              type="radio"
              name="daysAvailable"
              id="weekdays"
              value="weekdays"
              required
            />
            <label htmlFor="weekdays">Weekdays only</label>

            <input
              type="radio"
              name="daysAvailable"
              id="Everyday"
              value="Everyday"
              required
            />
            <label htmlFor="Everyday">Everyday</label>
</fieldset>

            <label htmlFor="servings">Servings</label>
            <input
              type="number"
              name="servings"
              min="1"
              onChange={(e) => handleChange(e)}
              require
            />
            <errorMessageStyled>{formError.contains}</errorMessageStyled>

            <div>
              <label htmlFor="time-required">
                Days required in advance to order:
              </label>
              <input
                type="number"
                name="daysInAdvance"
                min="1"
                max="30"
                onChange={(e) => handleChange(e)}
                require
              />
            </div>
            <errorMessageStyled>{formError.contains}</errorMessageStyled>

            <button type="submit">{method}</button>
          </FormStyled>
        </Div>
      </Wrapper>
    </>
  );
};

const Div = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
`;

const errorMessageStyled = styled.p`
  border: 2px solid red;
  color: "red";
`;
