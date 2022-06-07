// Require modules
import { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import {UserContext} from "../../components/UserContext";

// Require components
import salmon from "../../images/salmon.jpg";
import LogoutButton from "../../components/LogoutButton";
import Profile from "../ProfilePage/Profile";
import LoginButton from "../../components/LoginButton";

const Homepage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [meals, setMeals] = useState("");
  
  useEffect(() => {
    fetch(`api/home`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMeals(data);
        setIsLoaded(true);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(isLoaded)

  return (
    <>
      {/* <NavLink to="/profile">Profile</NavLink>
      <LoginButton />
      <LogoutButton />
      <NavLink to="/meals">Meals</NavLink> */}
      {/* <NavLink to="/meal/add">Add Meal</NavLink>
      <NavLink to="/meal/del">Delete Meal</NavLink>
      <NavLink to="/meal/upd">Update Meal</NavLink> */}
      {isLoaded ? (
        <div>
          <Div style={{ backgroundImage: `url(${salmon})` }}>
            <H1>
              Welcome to Dinner Swap Because we are all good at least at one
              thing!
            </H1>
          </Div>
        </div>
      ) : (
        <LoadingWrapper>
          <CircularProgress />
        </LoadingWrapper>
      )}
    </>
  );
};

export default Homepage;

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
  transform: translate(-50%, -50%);
  width: 400px;
`;

const LoadingWrapper = styled.div`
  display: flex;
  margin-top: 50px;
  justify-content: center;
`;
