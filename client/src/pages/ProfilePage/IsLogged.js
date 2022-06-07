import { useAuth0 } from "@auth0/auth0-react";

const IsLogged = () => {
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
        {window.sessionStorage.setItem("email", JSON.stringify(user.email))}
      </div>
    )
  );
};

export default IsLogged;