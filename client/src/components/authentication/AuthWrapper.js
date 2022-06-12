import { useAuth0 } from "@auth0/auth0-react";

const AuthWrapper = ({ children }) => {
  const { isLoading, error } = useAuth0();

  if (isLoading) {
    return <h2>...loading</h2>;
  }

  if (error) {
    return <h2>{error.message}</h2>;
  }
  return <>{children}</>;
};

export default AuthWrapper;
