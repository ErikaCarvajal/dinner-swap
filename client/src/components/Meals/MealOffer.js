import { useState } from "react";
import styled from "styled-components";
import moment from "moment";

const MealOffer = ({ userId, mealId, daysInAdvance }) => {
  const today = new Date();
  const [mealOffer, setMealOffer] = useState({
    offerDate: today,
    offerQty: 0,
    cutOffDate: 0,
  });

  const nextAvailableDay = moment(today)
    .add(daysInAdvance, "days")
    .format("YYYY-MM-DD");

  const handleChange = (e) => {
    e.preventDefault();
    let key = e.target.name;
    let value = e.target.value;
    setMealOffer({ ...mealOffer, [key]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(mealOffer);

    fetch(`/api/meal/${mealId}/offer`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        mealOffer,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Label htmlFor="offerOn">Next date offer on: </Label>
        <input
          type="date"
          id="offerDate"
          name="offerDate"
          min={nextAvailableDay}
          onChange={(e) => handleChange(e)}
        />
        <Label htmlFor="offerQty">Quantity offer:</Label>
        <input
          type="number"
          id="offerQty"
          name="offerQty"
          min={1}
          defaultValue={0}
          onChange={(e) => handleChange(e)}
        />
        <Label htmlFor="cutOffDate">Cut off on:</Label>
        <input
          type="date"
          id="cutOffDate"
          name="cutOffDate"
          min={today}
          max={mealOffer["offerDate"]}
          onChange={(e) => handleChange(e)}
        />
        <input type="submit" value="Send Offer" />
      </Form>
    </div>
  );
};

export default MealOffer;

const Label = styled.label`
  color: var(--primary-color);
  font-family: var(--heading-font-family);
  font-size: 20px;
  margin-bottom: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-left: 20px;

  input {
    width: 200px;
    margin-bottom: 20px;
  }
`;
