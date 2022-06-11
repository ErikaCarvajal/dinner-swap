// Require modules
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useNavigate } from "react-router-dom";
import IsLogged from "../ProfilePage/IsLogged";
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from "../../components/UserContext";

// Require components

const Meals = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [isLoaded, setIsLoaded] = useState(false);
  const [meals, setMeals] = useState("");
  const navigate = useNavigate();
  const userFromContext = useContext(UserContext);

  useEffect(() => {
    console.log("HELOOooOOOOOOOOOOOO")
    fetch(`/api/meals`)
      .then((res) => res.json())
      .then((data) => {
        console.log("from fetch", data.data);
        setMeals(data.data);
        setIsLoaded(true);
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

  // const HandleClickNotSign = () => {

  // }

  return (
    <>
      {isLoaded ? (
        <MealCards>
          <ul>
            {meals.map((item) => {
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => HandleClick(item._id)}
                >
                  <Img src={item.secure_url} />
                  <p>{item.name}</p>
                  <p>{item.points}</p>
                  <p>{item.description}</p>
                  <p>{item.contains}</p>
                  <p>{item.daysAvailable}</p>
                  <p>{item.servings}</p>
                  <p>{item.daysInAdvance} days</p>
                </button>
              );
            })}
          </ul>
        </MealCards>
      ) : (
        <LoadingWrapper>
          <CircularProgress />
        </LoadingWrapper>
      )}
    </>
  );
};

export default Meals;

const MealCards = styled.div`
  width: 100%;
  
`

const LoadingWrapper = styled.div`
  display: flex;
  margin-top: 50px;
  justify-content: center;
`;

const Img = styled.img`
  width: 400px;
  height: 400px;
`;
