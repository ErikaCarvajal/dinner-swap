import { useContext, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../UserContext";
import moment from "moment";
import Transactions from "../user/Transactions";

const Sold = () => {
  const { user } = useContext(UserContext);
  const [viewHistory, setViewHistory] = useState(false);
  const today = new Date();
  const todaysDate = moment(today).format("YYYY-MM-DD");

  const handleClick = (e) => {
    e.preventDefault();
    setViewHistory(!viewHistory);
  };

  if (user) {
    const { sold } = user;
    let activeSold = sold.filter((item) => item.date >= todaysDate);
    let oldSold = sold.filter((item) => item.date < todaysDate);

    return (
      user && (
        <>
          <Header>
            <h2>Meals Sold</h2>
          </Header>
          <Div>
            <Transactions transactions={activeSold} />
          </Div>
          <Div>
            <input
              type="submit"
              value={viewHistory ? "Close History" : "View History"}
              onClick={(e) => handleClick(e)}
            />
          </Div>
          <Div>{viewHistory && <Transactions transactions={oldSold} />}</Div>
          <Div></Div>
        </>
      )
    );
  }
};

export default Sold;

const Div = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;
