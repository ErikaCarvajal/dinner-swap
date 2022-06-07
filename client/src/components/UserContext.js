import { createContext, useState, useEffect } from "react";
// import { useAuth0 } from "@auth0/auth0-react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // const { user, isAuthenticated } = useAuth0();
  const [userEmail, setUserEmail] = useState(sessionStorage.getItem("email") ? JSON.parse(sessionStorage.getItem("email")) : null);
  const [ user, setUser ] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    userEmail &&
    fetch(`/api/user/${userEmail}`)
      .then((res) => res.json())
      .then(({data}) => {
        console.log(data);
        setIsLoaded(true);
        setUser(data);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log("This is User", userEmail);
  console.log("This is User data", user);
  // if (isLoaded) {
    return (
      <>
        <UserContext.Provider
          value={{ userEmail, setUserEmail, isLoaded, setIsLoaded, user
          }}
        >
          {children}
        </UserContext.Provider>
      </>
    );
  // } else {
  //   <p>Still loading</p>;
  // }
};
