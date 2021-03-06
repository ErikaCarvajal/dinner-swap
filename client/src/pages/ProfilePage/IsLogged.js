import { useAuth0 } from "@auth0/auth0-react";

const IsLogged = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return isAuthenticated ? (
    <div>
      {window.sessionStorage.setItem("email", JSON.stringify(user.email))}
    </div>
  ) : (
    <div>{window.sessionStorage.removeItem("email")}</div>
  );
};

export default IsLogged;
