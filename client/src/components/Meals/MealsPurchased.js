import { useContext, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../UserContext";
import moment from "moment";
import Transactions from "../user/Transactions";

const Purchased = () => {
  const { user: myUser } = useContext(UserContext);
  const [viewHistory, setViewHistory] = useState(false);
  const today = new Date();
  const todaysDate = moment(today).format("YYYY-MM-DD");

  const handleClick = (e) => {
    e.preventDefault();
    setViewHistory(!viewHistory);
  };

  if (myUser) {
    const { purchased } = myUser;
    let activePurchases = purchased.filter((item) => item.date >= todaysDate);

    let oldPurchases = purchased.filter((item) => item.date < todaysDate);

    return (
      myUser && (
        <>
          <Header>
            <h2>Meals Purchased</h2>
          </Header>
          <Div>
            <Transactions transactions={activePurchases} />
          </Div>
          <Div>
            <Input
              type="submit"
              value={viewHistory ? "Close History" : "View History"}
              onClick={(e) => handleClick(e)}
            />
          </Div>
          <Div>
            {viewHistory && <Transactions transactions={oldPurchases} />}
          </Div>
          <Div></Div>
        </>
      )
    );
  }
};

export default Purchased;

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
