import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import styled from "styled-components";

import MealContent from "../../components/Meals/MealContent";
import MealForm from "../../components/Meals/MealForm";
import Options from "../../components/Options";
// import Wrapper from "../../components/Meals/MealWrapper";
import { UserContext } from "../../components/UserContext";
import OrderForm from "../../components/OrderForm";
import CommentInput from "../../components/CommentSection/CommentInput";
import AddUser from "../ProfilePage/AddUser";
import handleDelete from "../MealsPage/DeleteMeal";

export const SingleMeal = () => {
  let { id } = useParams();
  const { user } = useContext(UserContext);

  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [meal, setMeal] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [deletedMeal, setDeletedMeal] = useState(false);

  useEffect(() => {
    fetch(`/api/meal/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setIsLoaded(true);
        setMeal(data.data);
      })
      .catch((err) => console.log(err));
  }, [isEditing]); // !Add isEditing in the array here to re-fetch data from BE

  const handleChoice = (option) => {
    if (option === 0) {
      navigate("/meal/add");
    } else if (option === 1) {
      setIsEditing(true);
    } else {
      handleDelete(id, meal[0], setDeletedMeal);
    }
  };

  if (deletedMeal) {
    setDeletedMeal(false);
    navigate(`/meals`);
  }

  const handleClick = () => {
    navigate(`/user/${user.email}`);
  };

  if (isEditing) {
    return (
      <MealForm
        oldMealData={meal[0]}
        setIsEditing={setIsEditing}
        mealId={id}
        method="Update"
      />
    );
  }
  if (isLoaded && user) {
    console.log(user);
    return (
      <>
        {user.address.streetName === "" && (
          <Banner>
            Please add your address to post a meal.
            <button onClick={handleClick}>Update address</button>
          </Banner>
        )}
          <Div>
        <Wrapper>
              <MealContent meal={meal[0]} />
        </Wrapper>
            <StyledForm>
              Your current points are: {user.points}
              <div>
                <OrderForm
                  user={user}
                  userId={meal[0].userId}
                  mealPoints={meal[0].points}
                  mealId={meal[0]._id}
                  mealName={meal[0].name}
                  daysInAdvance={meal[0].daysInAdvance}
                  soldBy={meal[0].userId}
                />
              </div>
            </StyledForm>
          </Div>
            <div>
              <Options onChecked={handleChoice} />
            </div>
        <Wrapper>
          <div>
            <CommentInput userId={meal[0].userId} mealId={meal[0]._id} />
          </div>
        </Wrapper>
        <Wrapper>
          <div>
            {meal[0].comments ? (
              <ul>
                {meal[0].comments.map((review, index) => {
                  return (
                    <li key={`${index}CO`}>
                      <h4>{review.title}</h4>
                      <p>{review.comment}</p>
                      <p>{review.date}</p>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p>No comments yet</p>
            )}
          </div>
        </Wrapper>
      </>
    );
  } else {
    <p>Still Loading</p>;
  }
};

const Div = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledForm = styled.div`
  margin: 50px 50px;
`;

const Banner = styled.div`
  width: 100vw;
  top: 0;
  height: 50px;
  background: tomato;
  text-justify: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: var(--secondary-color);
  margin-left: -10px;
  width: 110%;
  box-shadow: 1px 8px 12px 0 black;
  padding: 12px 25px;
  position: relative;

  h3 {
    margin-bottom: 10px;
  }
`;