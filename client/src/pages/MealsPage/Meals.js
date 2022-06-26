// Require modules
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import moment from "moment";

//Fetches meals from all users and highlights the ones that are available
const Meals = () => {
  const { isAuthenticated } = useAuth0();
  const today = moment(new Date()).format("YYYY-MM-DD");
  const [isLoaded, setIsLoaded] = useState(false);
  const [meals, setMeals] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/meals`)
      .then((res) => res.json())
      .then((data) => {
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
                <Li
                  key={`${item.id}-m`}
                  style={{ cursor: "pointer" }}
                  type="button"
                  isAvailable={
                    item.offer &&
                    item.offer.some((el) => el.cutOffDate >= today)
                      ? true
                      : false
                  }
                  onClick={() => HandleClick(item._id)}
                  allMeals="allMeals"
                >
                  <P
                  // isAvailable={
                  //   item.offer &&
                  //   item.offer.some((el) => el.offerDate >= today)
                  //     ? true
                  //     : false
                  // }
                  >
                    {item.name}
                  </P>
                  <Points
                  // isAvailable={
                  //   item.offer &&
                  //   item.offer.some((el) => el.offerDate >= today)
                  //     ? true
                  //     : false
                  // }
                  >
                    Points: {item.points}
                  </Points>
                  <img src={item.secure_url} />
                  {item.offer &&
                    item.offer.some((el) => el.offerDate >= today) && (
                      <H2>Now available!</H2>
                    )}
                </Li>
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

  img {
    margin-top: 15px;
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
  /* color: ${(p) =>
    p.isAvailable ? "var(--secondary-color)" : "var(--primary-color)"}; */
  margin-bottom: 10px;
  font-size: 30px;
`;

const Points = styled.p`
  /* color: ${(p) =>
    p.isAvailable ? "var(--secondary-color)" : "var(--primary-color)"}; */
  font-size: 16px;
`;

const H2 = styled.h2`
  color: var(--tertiary-color);
`;

const Li = styled.li`
  background-color: ${(p) =>
    p.isAvailable ? "var(--primary-color)" : "#ffff"};
  color: ${(p) =>
    p.isAvailable ? "var(--secondary-color)" : "var(--primary-color)"};
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
  height: 350px;

  :hover {
    box-shadow: 1px 10px 10px 10px var(--primary-color);
  }
`;
