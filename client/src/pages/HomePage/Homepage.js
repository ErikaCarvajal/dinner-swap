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
        // console.log(data);
        setMeals(data);
        setIsLoaded(true);
      })
      .catch((err) => console.log(err));
  }, []);


  useEffect(() => {
    if (user?.email !== auth0User?.email) {
      navigate('/user/add')
      // console.log("user doesn't exits")
    }
  })


  return (
    <>
      {isLoaded ? (
        <div>
          <IsLogged />
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
