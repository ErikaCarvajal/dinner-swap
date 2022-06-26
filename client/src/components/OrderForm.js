import { useContext, useState } from "react";
import moment from "moment";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const OrderForm = ({ user, mealPoints, mealName, mealId, soldBy, chef }) => {
  const { updateDone, setUpdateDone } = useContext(UserContext);
  const { points, _id } = user;
  const navigate = useNavigate();
  const [orderQty, setOrderQty] = useState(0);
  const [orderDate, setOrderDate] = useState(0);
  const [orderPoints, setOrderPoints] = useState(0);
  const [userNewPoints, setUserNewPoints] = useState(0);
  const [maxPossibleQty, setMaxPossibleQty] = useState(
    Math.floor(points / mealPoints)
  );
  const [error, setError] = useState(false);
  const today = new Date();
  const nextAvailableDay = moment(today).format("YYYY-MM-DD");

  const handleQtyChange = (e) => {
    const pointsPerOrder = e.target.value * mealPoints;

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
      boughtBy: user.name,
    };
    let sellerPoints = orderPoints;

    //Update Buyer:
    user["purchased"] = {
      date: orderDate,
      quantity: orderQty,
      mealId: mealId,
      mealName: mealName,
      chef: chef,
    };
    user["points"] = userNewPoints;

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
        setUpdateDone(!updateDone);
        navigate("/meals");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <Label htmlFor="orderQty">Quantity to order</Label>
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
          <Label htmlFor="orderDate">Date for meal pick up:</Label>
          <input
            type="date"
            id="orderDate"
            name="orderDate"
            min={nextAvailableDay}
            onChange={(e) => setOrderDate(e.target.value)}
          />
        </div>

        <div>
          <Div2>
            <header>Total points for this order: </header>
            <p>{orderPoints}</p>
          </Div2>
        </div>
        <div>
          {user._id !== soldBy && <Input type="submit" value="Place Order" />}
        </div>
      </form>
      <p>{error}</p>
    </Div>
  );
};

export default OrderForm;

const Label = styled.label`
  color: var(--primary-color);
  font-family: var(--heading-font-family);
`;

const Div = styled.div`
  width: 300px;
  line-height: 30px;

  header {
    margin-right: 5px;
  }

  input {
    margin-left: 5px;
  }
`;

const Div2 = styled.div`
  display: flex;
  /* flex-direction: row; */
  justify-content: flex-start;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 10px;
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
