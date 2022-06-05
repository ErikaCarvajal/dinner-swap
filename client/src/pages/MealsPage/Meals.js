// Require modules
import { useEffect, useState } from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useNavigate } from "react-router-dom";

// Require components

const Meals = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [meals, setMeals] = useState("");
  const navigate = useNavigate();

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
    navigate(`/meals/${id}`)
  }

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
                  
                    <button type="button" onClick={()=>HandleClick(item._id)} key={item.id}>
                        <Img src={item.imageSrc} />
                        <p>{item.name}</p>
                        <p>{item.points}</p>
                        <p>{item.description}</p>
                        <p>{item.contains}</p>
                        <p>{item.daysAvailable}</p>
                        <p>{item.servings}</p>
                        <p>{item.timeRequired}</p>
                    </button>
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