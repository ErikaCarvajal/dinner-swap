import styled from "styled-components";
import moment from "moment";

const SingleTransaction = ({ transaction }) => {
  const { mealName, quantity, date, chef, boughtBy } = transaction;

  return (
    <Wrapper key={`${quantity}-${date}`}>
      <h3>{mealName}</h3>
      <div>
        <span>
          {`Ordered: ${quantity} for pick up ${moment(date).format(
            "MMMM DD, YYYY"
          )}`}
        </span>{" "}
        {chef && (
          <span>
            by Chef <em>{chef}</em>
          </span>
        )}
        {boughtBy && (
          <span>
            bought by <em>{boughtBy}</em>
          </span>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: space-between;
  justify-content: center;
  background-color: hsl(0, 100%, 100%);
  margin: 8px auto;
  width: 100%;
  box-shadow: 1px 8px 12px 0 var(--primary-color);
  font-family: "Comic Sans MS", "Roboto", sans-serif;
  padding: 12px 25px;
  position: relative;

  h3 {
    margin-bottom: 10px;
  }

  span {
    margin-left: 10px;
  }

  em {
    color: hsl(130, 3%, 53%);
  }
  /* min-width: 100%;
  background: lime; */
`;

export default SingleTransaction;
