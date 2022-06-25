import styled from "styled-components";
import SingleTransaction from "../../pages/ProfilePage/SingleTransaction";

const Transactions = ({ transactions }) => {
  transactions.sort((a, b) => {
    let dateA = new Date(a.date);
    let dateB = new Date(b.date);
    return dateB - dateA;
  });
  console.log(transactions);
  return (
    <>
      <Wrapper>
        <ul>
          {transactions.length > 0 ? (
            <div>
              {transactions.map((transaction) => {
                return <SingleTransaction transaction={transaction} />;
              })}
            </div>
          ) : (
            <h2>Nothing to report.</h2>
          )}
        </ul>
      </Wrapper>
    </>
  );
};

export default Transactions;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: var(--secondary-color);
  margin-left: -10px;
  width: 60%;
  box-shadow: 1px 8px 12px 0 black;
  padding: 12px 25px;
  position: relative;
`;
