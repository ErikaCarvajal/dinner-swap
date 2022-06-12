import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const usePrivateRoute = () => {
  const { isAuthenticated } = useAuth0();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      console.log(isAuthenticated);
      navigate("../meals", { replace: true });
    }
  }, []);

  return;
};

export default usePrivateRoute;
