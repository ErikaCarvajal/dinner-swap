import styled from "styled-components";

const SingleTransaction = ({ transaction }) => {
  const { mealName, quantity, date } = transaction;
  return (
    <Wrapper key={`${quantity}-${date}`}>
      <h3>{mealName}</h3>
      <div>
        <span>{`Quantity: ${quantity}. Date: ${date}`}</span>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: var(--secondary-color);
  margin: 8px auto;
  width: 100%;
  box-shadow: 1px 8px 12px 0 black;
  padding: 12px 25px;
  position: relative;

  h3 {
    display: flex;
    justify-content: center;
  }

  span {
    margin-left: 10px;
  }
  /* min-width: 100%;
  background: lime; */
`;

export default SingleTransaction;
