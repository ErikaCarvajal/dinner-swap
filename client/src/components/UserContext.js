import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { createContext, useState, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { user: auth0User, isAuthenticated } = useAuth0();
  const [updateDone, setUpdateDone] = useState(false);

  useEffect(() => {
    //Check if user exists
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

  return (
    <>
      {/* {isLoaded && auth0User ? ( */}
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
      {/* ) : (
        <LoadingWrapper>
          <CircularProgress />
        </LoadingWrapper>
      )} */}
    </>
  );
};

const LoadingWrapper = styled.div`
  display: flex;
  margin-top: 50px;
  justify-content: center;
`;
