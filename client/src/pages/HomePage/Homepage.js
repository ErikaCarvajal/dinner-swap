// Require modules
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useNavigate } from "react-router-dom";

// Require components
import salmon from "../../images/salmon.jpg";
import Profile from "../ProfilePage";
import IsLogged from "../ProfilePage/IsLogged";
import { UserContext } from "../../components/UserContext";

const Homepage = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const { user: auth0User, isAuthenticated, isLoading } = useAuth0();
  const [meals, setMeals] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetch(`api/home`)
      .then((res) => res.json())
      .then((data) => {
        setMeals(data);
        setIsLoaded(true);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {isLoaded ? (
        <div>
          <IsLogged />
          <Div style={{ backgroundImage: `url(${salmon})` }} > </Div>
          <div>
            <H1>Welcome to Meal Swap!</H1>
          </div>
            <H2>
              We believe that everyone is good at making at least one kind of
              meal, wether it be a peanut butter sandwich or duck a l'orange.
              This site allows you to offer the very best of what you know how
              to cook and in return enjoy other people's signature dishes. It's
              simple; make meals to earn points and spend points to buy meals.
              So sign up and we'll get you sarted with 50 free points
            </H2>
          {/* </Div> */}
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
  height: 400px;
  width: 400px;
  object-fit: cover;
  background-position: center;
  /* background-repeat: no-repeat; */
  background-size: cover;
  margin: 20px auto;
  
  /* box-shadow: inset 0px 0px 400px 110px rgba(0, 0, 0, .9); */
`;

const H1 = styled.h1`
  color: var(--primary-color);
  width: 100vw;
  font-size: 45px;
  display: flex;
  justify-content: center;
  text-align: center;
  /* position: absolute; */
  /* top: 40%;
  left: 50%; */
  /* transform: translate(-50%, -50%); */
  `;

const H2 = styled.h2`
margin-top: 35px;
  color: var(--primary-color);
  font-size: 25px;
  display: flex;
  justify-content: center;
  font-weight: bolder;
  align-self: center;
  text-align: center;
  width: 70%;
  margin-left: 20%;
  /* background-color: var(--secondary-color); */
  /* position: absolute; */
  /* top: 40%; */
  /* left: 50%;  */
  /* transform: translate(-50%, -50%); */
`;




const LoadingWrapper = styled.div`
  display: flex;
  margin-top: 50px;
  justify-content: center;
`;
