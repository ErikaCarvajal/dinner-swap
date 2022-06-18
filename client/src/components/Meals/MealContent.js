import styled from "styled-components";

const MealContent = (props) => {
  return (
    <Wrapper>
      <MealTitle>
        <h1>{props.meal.name}</h1>
        <span>{props.meal.points} points</span>
      </MealTitle>
      <img src={props.meal.secure_url} />
      <Div>
        <header>Description:</header>
        <p>{props.meal.description}</p>
      </Div>
      <Div>
        <header>Contains: </header>
        <p>{props.meal.contains}</p>
      </Div>
      <Div>
        <header>Days Available:</header>
        <p>{props.meal.daysAvailable}</p>
      </Div>
      <Div>
        <header>Servings: </header>
        <p>{props.meal.servings}</p>
      </Div>
      <Div>
        <header>Required notice (days): </header>
        <p>{props.meal.daysInAdvance} days</p>
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
    object-fit: cover;
    width: 200px;
    height: 200px;
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
`;

const Div = styled.div`
  display: flex;
  /* flex-direction: row; */
  justify-content: flex-start;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 10px;
`;
