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
        isEditing={isEditing}
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
          <Div>
            <MealContent meal={meal[0]} />
            <StyledForm>
              <UserPointsStyling>
                <header>Your current points are:</header>
                <p>{user.points}</p>
              </UserPointsStyling>
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
        </Div>
        <div>
          <Options onChecked={handleChoice} />
        </div>
        {/* <Wrapper> */}
        <div>
          <CommentInput
            userId={meal[0].userId}
            mealId={meal[0]._id}
            setIsEditing={setIsEditing}
            isEditing={isEditing}
          />
        </div>
        {/* </Wrapper> */}
        <Wrapper>
          <div>
            {meal[0].comments ? (
              <ul>
                {meal[0].comments.map((review, index) => {
                  return (
                    <li key={`${index}CO`}>
                      <h4>{review.title}</h4>
                      <p>{review.comment}</p>
                      {/* <p>{review.date}</p> */}
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
  padding: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 80px;
`;

const StyledForm = styled.div`
  display: flex;
  justify-content: center;
  background-color: var(--secondary-color);
  width: 50%;
  box-shadow: 1px 8px 12px 0 black;
  padding: 12px 25px;
  position: relative;
  flex-wrap: wrap;
  align-content: center;
  flex-direction: column;
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
  justify-content: center;
  background-color: var(--secondary-color);
  margin: 80px auto;
  width: 50%;
  box-shadow: 1px 8px 12px 0 black;
  padding: 12px 25px;
  position: relative;

  h3 {
    margin-bottom: 10px;
  }
`;

const UserPointsStyling = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 10px;
  padding-bottom: 20px;
`;
