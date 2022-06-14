import { useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const OrderForm = ({
  user,
  mealPoints,
  mealName,
  daysInAdvance,
  mealId,
  soldBy,
}) => {
  const { points, _id } = user;
  const [orderQty, setOrderQty] = useState(0);
  const [orderDate, setOrderDate] = useState(0);
  const [orderPoints, setOrderPoints] = useState(0);
  const [userNewPoints, setUserNewPoints] = useState(0);
  const [maxPossibleQty, setMaxPossibleQty] = useState(
    Math.floor(points / mealPoints)
  );
  const [error, setError] = useState(false);
  const today = new Date();
  const nextAvailableDay = moment(today)
    .add(daysInAdvance, "days")
    .format("YYYY-MM-DD");
  // const minOrderDate = moment(
  //   today.setDate(today.getDate() + daysInAdvance)
  // ).format("YYYY-MM-DD");

  const navigate = useNavigate();

  const handleQtyChange = (e) => {
    const pointsPerOrder = e.target.value * mealPoints;
    console.log("qty value", e.target.value);
    setOrderQty(e.target.value);
    setOrderPoints(pointsPerOrder);
    if (points - pointsPerOrder < 0) {
      setError("You don't have enough points");
      e.target.value = 0;
      setOrderQty(0);
    } else {
      setUserNewPoints(points - pointsPerOrder);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //Update Seller plus meal_userId
    let sold = {
      date: orderDate,
      quantity: orderQty,
      mealId: mealId,
      mealName: mealName,
    };
    let sellerPoints = orderPoints;

    //Update Buyer:
    user["purchased"] = {
      date: orderDate,
      quantity: orderQty,
      mealId: mealId,
      mealName: mealName,
    };
    user["points"] = userNewPoints;

    console.log("user, sold, soldby", user, sold, soldBy);
    fetch(`/api/order/${_id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        user,
        sold,
        sellerPoints,
        soldBy,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        navigate("/profile");
      })
      .catch((err) => console.log(err));
  };


  return (
    <>   
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          points
          <label htmlFor="orderQty">Quantity to order</label>
          <input
            type="number"
            id="orderQty"
            name="orderQty"
            min={1}
            max={maxPossibleQty}
            defaultValue={0}
            onChange={(e) => handleQtyChange(e)}
          />
        </div>

        <div>
          <label htmlFor="orderDate">Date for meal pick up:</label>
          <input
            type="date"
            id="orderDate"
            name="orderDate"
            min={nextAvailableDay}
            onChange={(e) => setOrderDate(e.target.value)}
          />
        </div>

        <div>
          <p>Total points for this order: {orderPoints}</p>
          <p>Your new total is of {userNewPoints} points</p>
        </div>

        <div>
    <p>{}</p>

        {user._id !== soldBy &&
          <input type="submit" value="Place Order" />}
        </div>
      </form>
      <p>{error}</p>
    </>
  );
};

export default OrderForm;
