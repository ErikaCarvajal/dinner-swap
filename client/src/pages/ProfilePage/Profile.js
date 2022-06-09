import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { UserContext } from "../../components/UserContext";
import Wrapper from "../../components/Meals/MealWrapper";


const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { user: userDB} = useContext(UserContext);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (isAuthenticated) {
    console.log(user);
  }

  return (
    <Wrapper>
    {isAuthenticated ? (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>Email: {user.email}</p>
        <p>Name: {userDB.name}</p>
        <p>Address: {userDB.address}</p>
        <p>Points: {userDB.points}</p>
      </div>
    ) : (
      <h2>Please log in to be able to see your profile</h2>
    )}
      </Wrapper>
  );
};

export default Profile;
