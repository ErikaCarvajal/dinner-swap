import { useAuth0 } from "@auth0/auth0-react";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // CODE THAT I WAS USING:
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { user: auth0User, isAuthenticated } = useAuth0();
  const [updateDone, setUpdateDone] = useState(false);

  useEffect(() => {
    // Try to get the user from MongoDB
    if (isAuthenticated) {
      fetch(`/api/user/${auth0User.email}`)
        .then((res) => res.json())
        .then((res) => {
          if (res.status === 200) {
            setIsLoaded(true);
            setUser(res.data[0]);
          }
          // If the user does not exist, add them to MongoDB
          if (res.status === 404) {
            fetch(`/api/user/add`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ...auth0User,
                points: 50,
                address: {
                  streetNumber: "",
                  streetName: "",
                  city: "",
                  postCode: "",
                  province: "",
                },
                purchased: [],
                sold: [],
              }),
            }) //TODO: check what is comming from here
              .then((res) => res.json())
              .then((res) => {
                if (res.status === 200) {
                  setIsLoaded(true);
                  setUser(res.data);
                }
              });
          }
        })
        .catch((err) => console.log(err));
    }
  }, [auth0User, updateDone]);

  // console.log("from usercontext", user.address)

  return (
    <>
      <UserContext.Provider
        value={{
          isLoaded,
          setIsLoaded,
          user,
          setUser,
          updateDone,
          setUpdateDone,
        }}
      >
        {children}
      </UserContext.Provider>
    </>
  );
};

// NEW CODE:
// const { user, isAuthenticated, loginWithRedirect, logout, isLoading } = useAuth0();
// const [myUser, seMyUser] = useState(null);

// useEffect(() => {
//   console.log(`user: ${user}`)
// }, [isAuthenticated]);

// console.log("user from DB", user)
// console.log("user from Auth0", auth0User)

// return (
//   <>
//     <UserContext.Provider value={{loginWithRedirect, logout, myUser}} >
//       {children}
//     </UserContext.Provider>
//   </>
// );
// };

// export const useUserContext = () => {
//   return useContext(UserContext)
// }
