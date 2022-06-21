// Require modules
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";

// import IsLogged from "../ProfilePage/IsLogged";
// Require components
import { UserContext } from "../../components/UserContext";
import { MealCards } from "../../components/GlobalStyles";

const Meals = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [isLoaded, setIsLoaded] = useState(false);
  const [meals, setMeals] = useState("");
  const navigate = useNavigate();
  // const userFromContext = useContext(UserContext);

  useEffect(() => {
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
      navigate(`/meal/${id}`, { state: { special: "allMeals" } });
    } else {
      window.alert(`Login to continue`);
    }
  };

  return (
    <>
      {isLoaded ? (
        <MealCards>
          <ul>
            {meals.map((item) => {
              return (
                <li
                  style={{ cursor: "pointer" }}
                  key={item.id}
                  type="button"
                  onClick={() => HandleClick(item._id)}
                  allMeals="allMeals"
                >
                  <P>{item.name}</P>
                  <Points>Points: {item.points}</Points>
                  <img src={item.secure_url} />
                </li>
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

// const MealCards = styled.div`
//   width: 85vw;
//   margin: 0 auto;
//   ul {
//     display: flex;
//     flex-direction: row;
//     flex-wrap: wrap;
//     justify-content: space-between;
//     max-width: 100%;
//     list-style-type: none;
//   }

//   li {
//     cursor: pointer;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     text-align: center;
//     list-style-type: none;
//     margin-top: 60px;
//     width: 30%;
//     box-shadow: 1px 10px 10px 10px lightgray;
//     border-radius: 15px;
//     border: none;
//     height: 350px;
//     :hover {
//       box-shadow: 1px 10px 10px 10px var(--primary-color);
//     }
//   }

//   img {
//     margin-top: 15px;
//     object-fit: cover;
//     width: 200px;
//     height: 200px;
//     border-radius: 1.2em;
//   }
// `;

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
