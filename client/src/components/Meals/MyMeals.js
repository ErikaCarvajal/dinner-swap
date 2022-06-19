import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

import { MealCards } from "../GlobalStyles";

export const MyMeals = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { id } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const [meals, setMeals] = useState("");

  useEffect(() => {
    fetch(`/api/meals/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setIsLoaded(true);
        setMeals(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const HandleClick = (id) => {
    if (isAuthenticated) {
      navigate(`/meal/${id}`);
    } else {
      window.alert(`Login to continue`);
    }
  };

  return (
    <>
      {isLoaded ? (
        <>
          <H2>My Kitchen</H2>
          <MealCards>
            <ul>
              {meals.map((item) => {
                return (
                  <li
                    style={{ cursor: "pointer" }}
                    key={item.id}
                    type="button"
                    onClick={() => HandleClick(item._id)}
                  >
                    <P>{item.name}</P>
                    <Points>Points: {item.points}</Points>
                    <img src={item.secure_url} />
                  </li>
                );
              })}
            </ul>
          </MealCards>
        </>
      ) : (
        <LoadingWrapper>
          <CircularProgress />
        </LoadingWrapper>
      )}
    </>
  );
};

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
