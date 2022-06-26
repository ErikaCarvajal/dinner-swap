import moment from "moment";
import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import Error from "../Error";
import Options from "../../components/Options";
import OrderForm from "../../components/OrderForm";
import handleDelete from "../MealsPage/DeleteMeal";
import MealForm from "../../components/Meals/MealForm";
import { UserContext } from "../../components/UserContext";
import MealContent from "../../components/Meals/MealContent";
import CommentInput from "../../components/CommentSection/CommentInput";

export const SingleMeal = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [meal, setMeal] = useState();
  const { user } = useContext(UserContext);
  const [error, setError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
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
      .catch((err) => {
        setError(true);
      });
  }, [isEditing, addComment]); // Add isEditing in the array here to re-fetch data from BE

  const handleChoice = (option) => {
    if (option === 0) {
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
    navigate(`/profile`, { replace: true });
  };

  if (error) {
    return <Error />;
  }
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
    if (meal[0].comments) {
      const { comments } = meal[0];
      comments.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }
    const bought = user.purchased.findIndex((item) => {
      return item.mealId === meal[0]._id;
    });
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
            <MealContent meal={meal[0]} userIdNumber={user._id} />
            {meal[0].userId !== user._id && (
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
                    soldBy={meal[0].userId}
                    chef={meal[0].chef}
                  />
                </div>
              </StyledForm>
            )}
          </Div>
        </Div>
        {meal[0].userId === user._id && location.state === null && (
          <div>
            <Options onChecked={handleChoice} />
          </div>
        )}
        {meal[0].userId !== user._id && bought >= 0 && (
          <div>
            <CommentInput
              userId={meal[0].userId}
              mealId={meal[0]._id}
              userName={user.name}
              addComment={addComment}
              setAddComment={setAddComment}
            />
          </div>
        )}
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
    min-width: 500px;
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
