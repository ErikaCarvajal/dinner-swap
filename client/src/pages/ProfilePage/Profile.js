import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (isAuthenticated) {
    console.log(user);
  }

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        {window.sessionStorage.setItem("email", JSON.stringify(user.email))}
      </div>
    )
  );
};

export default Profile;
