import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../components/UserContext";
import Wrapper from "../../components/Meals/MealWrapper";
import usePrivateRoute from "../../hooks/usePrivateRoute";
import AddUser from "./AddUser";

const Profile = (props) => {
  // const { user, isAuthenticated, isLoading } = useAuth0();
  const { user, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();
  const { user: myUser, address } = useContext(UserContext);
  const { streetNumber, streetName, city, postCode, province } = address;
  if (myUser) {
    console.log("This is user from DB in profile", myUser);
  }

  usePrivateRoute();


  // if (myUser) {
  //   console.log("from inside address")
  //   console.log(myUser.address)
  //   navigate(`/user/${user.email}`)
  // }

  return (
    <div>
    <Wrapper>
      {isAuthenticated && myUser ? (
        <div>
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>Email: {user.email}</p>
          <p>Name: {myUser.name}</p>
          <p>Points: {myUser.points}</p>
          {/* <p>Address: {myUser.address}</p> */}
          {(myUser.address) ? (
            <div> 
          <p>Address: </p>
          <p>Street Number: {streetNumber}</p>
          <p>Street Name: {streetName}</p>
          <p>City: {city}</p>
          <p>Postal Code: {postCode}</p>
          <p>Province: {province}</p>
           </div>):(<AddUser/>)}
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </Wrapper>
    </div>
  );
};

export default Profile;
