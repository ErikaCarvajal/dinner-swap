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
  const { user: myUser } = useContext(UserContext);
  
  
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
          {(!myUser.address) ? 
          (<><p>got to add user</p> 
           <AddUser/></>
           ) : ( <div> 
          <p>Address: </p>
          <p>Street Number: {myUser.address.streetNumber}</p>
          <p>Street Name: {myUser.address.streetName}</p>
          <p>City: {myUser.address.city}</p>
          <p>Postal Code: {myUser.address.postCode}</p>
          <p>Province: {myUser.address.province}</p>
           </div>)}
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </Wrapper>
    </div>
  );
};

export default Profile;
