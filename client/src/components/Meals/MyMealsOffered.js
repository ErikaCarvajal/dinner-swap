import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import moment from "moment";

import { UserContext } from "../../components/UserContext";
// import { MealCards } from "../GlobalStyles";
// import Options from "../../components/Options";
// import Transactions from "../user/Transactions";

export const Offered = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { user: myUser, updateDone, setUpdateDone } = useContext(UserContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const [meals, setMeals] = useState("");
  const today = moment(new Date()).format("YYYY-MM-DD");

  useEffect(() => {
    fetch(`/api/meals/${myUser._id}`)
      .then((res) => res.json())
      .then((data) => {
        setMeals(data.data);
        setIsLoaded(true);
      })
      .catch((err) => console.log(err));
  }, []);

  if (isLoaded && myUser) {
    let offerMealArray = meals.filter((meal) => {
      if (meal.offer) {
        return {
          ...meal,
          ["offer"]: meal.offer.filter((item) => item.offerQty === "1"),
        };
      }
    });

    return (
      <>
        <H2>Meals currently offered</H2>
        <MealCard>
          <ul>
            {offerMealArray.map((item) => {
              return (
                <li key={item.id} type="button">
                  <P>{item.name}</P>
                  <Points>Points: {item.points}</Points>
                  <img src={item.secure_url} />
                  <div>
                    {item.offer.map((meal) => {
                      if (meal.cutOffDate >= today) {
                        return (
                          <>
                            <Points>
                              Offer for{" "}
                              {moment(meal.offerDate).format("MMM DD")}
                            </Points>
                            <Points>Quantity {meal.offerQty}</Points>
                            <Points>
                              Cut off for orders:{" "}
                              {moment(meal.cutOffDate).format("MMM DD")}
                            </Points>
                            <Divider />
                          </>
                        );
                      }
                    })}
                  </div>
                </li>
              );
            })}
          </ul>
        </MealCard>
      </>
    );
  } else {
    <LoadingWrapper>
      <CircularProgress />
    </LoadingWrapper>;
  }
};

const MealCard = styled.div`
  width: 85vw;
  margin: 0 auto;

  ul {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    max-width: 100%;
    list-style-type: none;
  }

  li {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    list-style-type: none;
    margin-top: 60px;
    width: 30%;
    box-shadow: 1px 10px 10px 10px lightgray;
    border-radius: 15px;
    border: none;
    height: 650px;
  }

  img {
    margin-top: 15px;
    margin-bottom: 15px;
    object-fit: cover;
    width: 200px;
    height: 200px;
    border-radius: 1.2em;
  }
`;

const LoadingWrapper = styled.div`
  display: flex;
  margin-top: 50px;
  justify-content: center;
`;

const P = styled.p`
  color: var(--primary-color);
  margin-bottom: 10px;
  font-size: 30px;
`;

const Points = styled.p`
  color: var(--primary-color);
  font-size: 16px;
`;

const H2 = styled.h2`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const Divider = styled.div`
  height: 1px;
  border: 2px solid var(--primary-color);
  border-radius: 50%;
  margin-top: 10px;
  margin-bottom: 10px;
`;
