import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
// import { Children } from "react";

const PrivateRoute = ({children}) => {
    const { user, isAuthenticated } = useAuth0();
  const isUser = isAuthenticated && user;

  if(!isUser) {
    return <Navigate to='/meals' />
  }
  // return isUser ? children : <Navigate to="/" />;
  return <>{children}</>
};

export default PrivateRoute;
