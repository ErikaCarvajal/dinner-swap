import { useAuth0 } from "@auth0/auth0-react";
import { createContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth0 } from "@auth0/auth0-react";


export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // const navigate = useNavigate();
  // const { user, isAuthenticated } = useAuth0();
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { user: auth0User, isAuthenticated } = useAuth0();

  
  useEffect(() => {
    if (isAuthenticated) {
      fetch(`/api/user/${auth0User.email}`)
      .then((res) => res.json())
      .then(({ data }) => {
        setIsLoaded(true);
        setUser(data[0]);
      })
      .catch((err) => console.log(err));
    }
  }, [auth0User]);


  // console.log("user from DB", user)
  // console.log("user from Auth0", auth0User)
  
  return (
    <>
      <UserContext.Provider
        value={{
          isLoaded,
          setIsLoaded,
          user,
          setUser,
        }}
      >
        {children}
      </UserContext.Provider>
    </>
  );
};
