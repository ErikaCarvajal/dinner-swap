import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

import MealContent from "../../components/Meals/MealContent"
import Options from "../../components/Options"

const SingleMeal = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [meal, setMeal] = useState();

  useEffect(() => {
    fetch(`/api/meal/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setIsLoaded(true);
        setMeal(data.data);
        console.log("Data FE SingleMeal", data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChoice = (option) => {
    console.log("button checked ", option)
    if (option === 0) {
      navigate("/meal/add")
    } else if (option === 1) {
      navigate("/meal/upd") 
    } else {
      navigate("/meal/del")
    }
  }

  if (isLoaded) {
    return (
      <>
        <Options onChecked={handleChoice}/>
        <MealContent meal={meal[0]} />
      </>
    );
  } else {
    <p>Still Loading</p>;
  }
};

export default SingleMeal;