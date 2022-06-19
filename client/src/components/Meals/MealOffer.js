import { useState } from "react";
import styled from "styled-components";
import moment from "moment";

const MealOffer = ({ userId, mealId, daysInAdvance }) => {
  const [offerQty, setOfferQty] = useState(0);
  const [offerDate, setOfferDate] = useState(0);
  const [cutOffDate, setCutOffDate] = useState(0);
  const today = new Date();
  const nextAvailableDay = moment(today)
    .add(daysInAdvance, "days")
    .format("YYYY-MM-DD");

  // fulanito: jacques, donnas, dave
  // The greatest cook cook1 : exotic frue
  //  newuser60@... : BBQ Like never before
  //  newuser104@ : bbq

  return (
    <div>
      <Form>
        <Label htmlFor="offerOn">Next date offer on: </Label>
        <input
          type="date"
          id="offerDate"
          name="offerDate"
          min={nextAvailableDay}
          onChange={(e) => setOfferDate(e.target.value)}
        />
        <Label htmlFor="orderQty">Quantity offer:</Label>
        <input
          type="number"
          id="orderQty"
          name="orderQty"
          min={1}
          defaultValue={0}
          onChange={(e) => setOfferQty(e)}
        />
        <Label htmlFor="cutOffDate">Cut off on:</Label>
        <input
          type="date"
          id="cutOffDate"
          name="cutOffDate"
          min={today}
          max={offerDate}
          onChange={(e) => setCutOffDate(e.target.value)}
        />
        <button type="submit">Send Offer</button>
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
