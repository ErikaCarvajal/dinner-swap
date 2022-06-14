import { useState } from "react";

import SingleTransaction from "../../pages/ProfilePage/SingleTransaction";

const Transactions = ({ transactions }) => {
  const [bought, setBought] = useState("");
  const [sold, setSold] = useState("");

  console.log(transactions);

  return (
    <>
      <h1>Meals ordered</h1>
      <ul>
        {transactions.map((transaction, index) => {
          return <SingleTransaction transaction={transaction} />;
        })}
      </ul>
    </>
  );
};

export default Transactions;
