import { useState } from "react";
import moment from "moment";

const OrderForm = ({ userPoints, mealPoints, daysInAdvance }) => {
  const [orderPoints, setOrderPoints] = useState(0);
  const [userNewPoints, setUserNewPoints] = useState(0);
  const [maxPossibleQty, setMaxPossibleQty] = useState(
    Math.floor(userPoints / mealPoints)
  );
  const [error, setError] = useState(false);

  const today = new Date();
  const minOrderDate = moment(
    today.setDate(today.getDate() + daysInAdvance)
  ).format("YYYY-MM-DD");

  const handleQtyChange = (e) => {
    const pointsPerOrder = e.target.value * mealPoints;
    setOrderPoints(pointsPerOrder);
    if (userPoints - pointsPerOrder < 0) {
      setError("You don't have enough points");
      e.target.value = 0;
    }
  };

  const handleDateChange = (e) => {};

  return (
    <>
      <form>
        <div>
          <label htmlFor="quantity">Quantity to order</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            max={maxPossibleQty}
            defaultValue="1"
            onChange={(e) => handleQtyChange(e)}
          />
        </div>

        <div>
          <label htmlFor="date">Date for meal pick up:</label>
          <input
            type="date"
            id="date"
            name="date"
            min={minOrderDate}
            onChange={(e) => handleDateChange(e)}
          />
        </div>

        <div>
          <p>Total points for this order: {orderPoints}</p>
          <p>Your new total is of {orderPoints} points</p>
        </div>

        <div>
          <input type="button" value="Cancel" />
          <input type="button" value="Place Order" />
        </div>
      </form>
      <p>{error}</p>
    </>
  );
};

export default OrderForm;
