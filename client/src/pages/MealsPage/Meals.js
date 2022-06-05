// Require modules
import { useEffect, useState } from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";

// Require components

const Meals = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [meals, setMeals] = useState("");

  useEffect(() => {
    fetch(`api/meals`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setMeals(data.data);
        setIsLoaded(true);
      })
      .catch((err) => console.log(err));
  }, []);

//   isLoaded ? meals.map((item) => console.log(item)) : null;

  return (
    <>
      {isLoaded ? (
        <div>
            <H1>
              Meal listing
            </H1>
            <ul>
            {meals.map((item) => {
                return (
                    <li key={item.id}>
                        <Img src={item.imageSrc} />
                        <p>{item.name}</p>
                        <p>{item.points}</p>
                        <p>{item.description}</p>
                        <p>{item.contains}</p>
                        <p>{item.daysAvailable}</p>
                        <p>{item.servings}</p>
                        <p>{item.timeRequired}</p>
                    </li>
                )
            })}
            </ul>
        </div>
      ) : (
        <LoadingWrapper>
          <CircularProgress />
        </LoadingWrapper>
      )}
    </>
  );
};

export default Meals;

const Div = styled.div`
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const H1 = styled.h1`
  color: floralwhite;
  display: flex;
  justify-content: center;
  text-align: center;
  position: absolute;
  top: 40%;
  left: 50%;
  width: 400px;
`;

const LoadingWrapper = styled.div`
  display: flex;
  margin-top: 50px;
  justify-content: center;
`;

const Img = styled.img`
    width: 400px;
    height: 400px;
`