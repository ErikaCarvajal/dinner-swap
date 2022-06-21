import styled from "styled-components";
import SingleTransaction from "../../pages/ProfilePage/SingleTransaction";

// import { useState } from "react";
// import { useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { UserContext } from "../../components/UserContext";

const Transactions = ({ transactions }) => {
  // const { user: myUser, updateDone, setUpdateDone } = useContext(UserContext);

  transactions.sort((a, b) => {
    let dateA = new Date(a.date);
    let dateB = new Date(b.date);
    return dateB - dateA;
  });

  return (
    <>
      <Wrapper>
        <ul>
          {transactions.map((transaction) => {
            return <SingleTransaction transaction={transaction} />;
          })}
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

  h3 {
    margin-bottom: 10px;
  }
`;
