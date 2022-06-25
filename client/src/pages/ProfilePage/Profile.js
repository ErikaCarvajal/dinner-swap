import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../../components/UserContext";
// import Wrapper, { Container } from "../../components/Meals/MealWrapper";
import usePrivateRoute from "../../hooks/usePrivateRoute";
import AddUser from "./AddUser";
import Transactions from "../../components/user/Transactions";
import ProfileTabs from "./ProfileTabs";

const Profile = (props) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();
  const { user: myUser, updateDone, setUpdateDone } = useContext(UserContext);
  const [currentTab, setCurrentTab] = useState("");

  usePrivateRoute();

  const tabs = ["Update"];

  if (isAuthenticated && myUser) {
    const { name, picture, email } = user;
    const {
      name: myUserName,
      points,
      address: { streetNumber, streetName, city, postCode, province },
      purchased,
      sold,
    } = myUser;

    return (
      <div>
        <Wrapper>
          <Div>
            <UserInformationStyling>
              <div>
                <img src={picture} alt={name} />
              </div>
              <div>
                <h2>{myUserName} </h2>
                <p>Email: {email}</p>
                <p>Points: {points}</p>
                {streetName.length > 0 && (
                  <div>
                    <p>
                      Address: {streetNumber} {streetName}, {city},{" "}
                    </p>
                    <p>
                      {province}, {postCode}.
                    </p>
                  </div>
                )}
              </div>
            </UserInformationStyling>
            <div>
              <Tabs>
                {tabs.map((tab) => {
                  return (
                    <ProfileTabs
                      key={tab}
                      title={tab}
                      setCurrentTab={setCurrentTab}
                      currentTab={currentTab}
                    />
                  );
                })}
              </Tabs>
              <div>
                {currentTab === "Update" ? (
                  <AddUser
                    userName={myUserName}
                    streetNumber={streetNumber}
                    streetName={streetName}
                    city={city}
                    postCode={postCode}
                    province={province}
                    setCurrentTab={setCurrentTab}
                  />
                ) : null}
              </div>
            </div>
          </Div>
        </Wrapper>
      </div>
    );
  } else {
    <h2>Loading...</h2>;
  }
};

export default Profile;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: var(--secondary-color);
  margin: 80px auto;
  width: 50%;
  box-shadow: 1px 8px 12px 0 black;
  padding: 12px 25px;
  position: relative;

  h2 {
    padding-top: 10px;
    padding-bottom: 10px;
  }

  p {
    padding-top: 5px;
    padding-bottom: 5px;
  }

  h1 {
    margin-bottom: 15px;
  }
`;

const Div = styled.div`
  width: 80%;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  width: 100%;
`;

const UserInformationStyling = styled.div`
  display: flex;

  img {
    margin-right: 20px;
    border-radius: 50%;
  }
`;
