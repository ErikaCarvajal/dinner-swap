import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

import MealContent from "../../components/Meals/MealContent";
import MealForm from "../../components/Meals/MealForm";
import Options from "../../components/Options";

const SingleMeal = () => {
  let { id } = useParams();
  
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [meal, setMeal] = useState();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetch(`/api/meal/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setIsLoaded(true);
        setMeal(data.data);
        console.log("Data FE SingleMeal", data);
      })
      .catch((err) => console.log(err));
  }, [isEditing]); // !Add isEditing in the array here to re-fetch data from BE

  const handleChoice = (option) => {
    console.log("button checked ", option);
    if (option === 0) {
      navigate("/meal/add");
    } else if (option === 1) {
      // navigate(`/meal/upd/${id}`);
      setIsEditing(true);
    } else {
      navigate("/meal/del");
    }
  };

  if (isEditing) {
    return <MealForm oldMealData={meal[0]} setIsEditing={setIsEditing} mealId={id}/>;
  }

  if (isLoaded) {
    return (
      <>
        <Options onChecked={handleChoice} />
        <MealContent meal={meal[0]} />
      </>
    );
  } else {
    <p>Still Loading</p>;
  }
};

export default SingleMeal;
