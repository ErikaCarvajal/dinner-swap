import styled from "styled-components";

const SingleTransaction = ({ transaction }) => {
  const { mealName, quantity, date } = transaction;
  return (
    <Wrapper key={`${quantity}-${date}`}>
      <h3>{mealName}</h3>
      <div>
        <span>{`qty: ${quantity}, date: ${date}`}</span>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-width: 100%;
  background: lime;
`;

export default SingleTransaction;
