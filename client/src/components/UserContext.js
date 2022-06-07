import { createContext, useState, useEffect } from "react";
// import { useAuth0 } from "@auth0/auth0-react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // const { user, isAuthenticated } = useAuth0();
  const [user, setUser] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  // if (isAuthenticated) {
  //     setUser(user.email)
  // }
  const userEmail = JSON.parse(window.sessionStorage.getItem("email"));

  useEffect(() => {
    fetch(`/api/user/${userEmail}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIsLoaded(true);
        setUser(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log("This is User", user);
  if (isLoaded) {
    return (
      <>
        <UserContext.Provider
          value={{
            name: user[0].name,
            id: user[0]._id,
            email: user[0].email,
            address: user[0].address,
            points: user[0].points
          }}
        >
          {children}
        </UserContext.Provider>
      </>
    );
  } else {
    <p>Still loading</p>;
  }
};
