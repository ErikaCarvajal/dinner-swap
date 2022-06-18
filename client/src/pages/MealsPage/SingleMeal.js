import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";

import MealContent from "../../components/Meals/MealContent";
import MealForm from "../../components/Meals/MealForm";
import Options from "../../components/Options";
import { UserContext } from "../../components/UserContext";
import OrderForm from "../../components/OrderForm";
import CommentInput from "../../components/CommentSection/CommentInput";
import handleDelete from "../MealsPage/DeleteMeal";
// import { useAuth0 } from "@auth0/auth0-react";
// import AddUser from "../ProfilePage/AddUser";
// import Wrapper from "../../components/Meals/MealWrapper";

export const SingleMeal = () => {
  let { id } = useParams();
  const { user } = useContext(UserContext);

  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [meal, setMeal] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [deletedMeal, setDeletedMeal] = useState(false);
  const [addComment, setAddComment] = useState(false);

  useEffect(() => {
    fetch(`/api/meal/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setIsLoaded(true);
        setMeal(data.data);
      })
      .catch((err) => console.log(err));
  }, [isEditing, addComment]); // !Add isEditing in the array here to re-fetch data from BE

  // console.log("user name for comments", user);
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
    const { comments } = meal[0];
    comments.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
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
        <div>
          <CommentInput
            userId={meal[0].userId}
            mealId={meal[0]._id}
            userName={user.name}
            addComment={addComment}
            setAddComment={setAddComment}
          />
        </div>
        {/* Comments display */}
        <Wrapper>
          <div>
            {meal[0].comments ? (
              <ul>
                {meal[0].comments.map((review, index) => {
                  return (
                    <li key={`${index}CO`}>
                      <h3>{review.title}</h3>
                      <p>{review.comment}</p>
                      <footer>
                        <p>
                          <span>Created by:</span> {review.userName}
                        </p>
                        <p>
                          <span>On: {"  "}</span>
                          {moment(review.date).format("MMMM Do YYYY, h:mm a")}
                        </p>
                      </footer>
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
  margin: 0px auto;
  width: 50%;
  box-shadow: 1px 8px 12px 0 black;
  padding: 12px 25px;
  position: relative;

  h3 {
    margin-bottom: 10px;
  }

  li {
    background-color: hsl(0, 100%, 100%);
    margin: 5px auto;
    width: 90%;
    box-shadow: 1px 8px 12px 0 var(--primary-color);
    padding: 12px 25px;
    position: relative;
  }

  footer {
    display: flex;
    margin-top: 8px;
    justify-content: space-between;
    font-style: italic;
    font-size: 12px;
    color: var(--primary-color);
    font-family: "Comic Sans MS", "Roboto", sans-serif;

    span {
      font-weight: bolder;
    }
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
