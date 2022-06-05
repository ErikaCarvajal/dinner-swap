import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

const SingleMeal = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [meal, setMeal] = useState();

  useEffect(() => {
    fetch(`/api/meals/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setIsLoaded(true);
        setMeal(data.data);
        // console.log("Data FE SingleMeal", data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleClick = () => {
    navigate()
  }

  if (isLoaded) {
    return (
      <>
        Single Meal
        <button onClick={handleClick} >New Meal</button>
        <p>Name: {meal[0].name}</p>
        <p>Points: {meal[0].points}</p>
        <Img src={meal[0].imageSrc} />
        <p>Description: {meal[0].description}</p>
        <p>Contains: {meal[0].contains}</p>
        <p>Days Available: {meal[0].daysAvailable}</p>
        <p>Servings: {meal[0].servings}</p>
        <p>Time Required: {meal[0].timeRequired}</p>
      </>
    );
  } else {
    <p>Still Loading</p>;
  }
};

export default SingleMeal;

const Img = styled.img`
    width: 500px;
    height: 500px;
    margin: 10px;
`
