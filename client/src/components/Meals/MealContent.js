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
    offer,
    _id,
  } = props.meal;
  const location = useLocation();
  const today = moment(new Date()).format("YYYY-MM-DD");

  console.log(userId);
  console.log(props.userIdNumber);
  console.log(offer);

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
        <header>Servings: </header>
        <p>{servings}</p>
      </Div>
      <Div>
        <header>Next available dates, quantites and cut offs:</header>
      </Div>
      <Div>
        {offer ? (
          offer.map((item) => {
            if (item.offerDate >= today) {
              return (
                <>
                  <section>
                    For: {item.offerDate}, Quantity: {item.offerQty}, Cut off:{" "}
                    {item.cutOffDate}
                  </section>
                </>
              );
            }
          })
        ) : (
          <p>None available at the moment</p>
        )}
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

  section {
    margin-top: 5px;
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
