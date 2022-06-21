import styled from "styled-components";
import { useLocation } from "react-router-dom";
import moment from "moment";
import MealOffer from "./MealOffer";

const MealContent = (props) => {
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
    _id,
  } = props.meal;
  const location = useLocation();
  console.log("state from location", location.state);

  console.log(userId);
  console.log(props.userIdNumber);

  return (
    <Wrapper>
      <MealTitle>
        <h1>{name}</h1>
        <span>{points} points</span>
      </MealTitle>
      <Div2>
        <img src={secure_url} />
        {userId === props.userIdNumber && location.state === null && (
          <MealOffer
            userId={userId}
            mealId={_id}
            daysInAdvance={daysInAdvance}
          />
        )}
      </Div2>
      <Div>
        <header>Description:</header>
        <p>{description}</p>
      </Div>
      <Div>
        <header>Contains: </header>
        <p>{contains}</p>
      </Div>
      <Div>
        <header>Days Available:</header>
        <p>{daysAvailable}</p>
      </Div>
      <Div>
        <header>Servings: </header>
        <p>{servings}</p>
      </Div>
      <Div>
        <header>Required notice (days): </header>
        <p>{daysInAdvance} days</p>
      </Div>
    </Wrapper>
  );
};

export default MealContent;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: var(--secondary-color);
  width: 600px;
  box-shadow: 1px 8px 12px 0 black;
  padding: 12px 25px;
  position: relative;
  flex-wrap: wrap;
  align-content: center;
  flex-direction: column;

  h1 {
    font-size: 19px;
  }

  img {
    margin-top: 15px;
    margin-bottom: 15px;
    object-fit: cover;
    width: 300px;
    height: 300px;
    border-radius: 1.2em;
    align-self: center;
  }

  header {
    font-size: 18px;
    font-weight: bolder;
  }
`;

const MealTitle = styled.div`
  display: flex;
  justify-content: space-between;
  width: 530px;

  span {
    font-size: 20px;
  }
`;

const Div = styled.div`
  display: flex;
  /* flex-direction: row; */
  justify-content: flex-start;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 10px;
`;

const Div2 = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
`;
