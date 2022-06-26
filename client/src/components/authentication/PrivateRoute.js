import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const PrivateRoute = ({ children }) => {
  const { user, isAuthenticated } = useAuth0();
  const isUser = isAuthenticated && user;

  if (!isUser) {
    <alert>Please login to continue</alert>;
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};

export default PrivateRoute;
