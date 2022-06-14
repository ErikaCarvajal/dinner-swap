import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../components/UserContext";
import Wrapper from "../../components/Meals/MealWrapper";
import usePrivateRoute from "../../hooks/usePrivateRoute";
import AddUser from "./AddUser";
import Transactions from "../../components/user/Transactions";
import ProfileTabs from "./ProfileTabs";

const Profile = (props) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();
  const { user: myUser } = useContext(UserContext);
  const [currentTab, setCurrentTab] = useState("");
  const [ updateDone, setUpdateDone] = useState(false);

  if (myUser) {
    console.log("This is myUser from DB in profile", myUser);
  }

  usePrivateRoute();

  const tabs = ["Update", "Purchased", "Sold"];

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
          <div>
            <div>
              <img src={picture} alt={name} />
              <h2>{name}</h2>
              <p>Email: {email}</p>
              <p>Name: {myUserName}</p>
              <p>Points: {points}</p>
              {/* {streetNumber === "" ? (
                <>
                  <p>Please update your address</p>
                  <AddUser
                    userName={myUserName}
                    streetNumber=""
                    streetName=""
                    city=""
                    postCode=""
                    province=""
                  />
                </>
              ) : ( */}
                <div>
                  <p>Address: </p>
                  <p>Street Number: {streetNumber}</p>
                  <p>Street Name: {streetName}</p>
                  <p>City: {city}</p>
                  <p>Postal Code: {postCode}</p>
                  <p>Province: {province}</p>
                </div>
              {/* )} */}
            </div>
            <div>
              <div>
                {tabs.map((tab) => {
                  return (
                    <ProfileTabs
                      key={tab}
                      title={tab}
                      setCurrentTab={setCurrentTab}
                      currentTab={currentTab}
                      setUpdateDone={setUpdateDone}
                    />
                  );
                })}
              </div>
              <div>
                {currentTab === "Update" ? (
                  <AddUser
                    userName={myUserName}
                    streetNumber={streetNumber}
                    streetName={streetName}
                    city={city}
                    postCode={postCode}
                    province={province}
                  />
                ) : currentTab === "Purchased" ? (
                  <ul>
                    <li>
                      <h1>Meals Bought</h1>
                      {purchased && <Transactions transactions={purchased} />}
                    </li>
                  </ul>
                ) : currentTab === "Sold" ? (
                  <ul>
                    <li>
                      Meals Ordered
                      {sold && <Transactions transactions={sold} />}
                    </li>
                  </ul>
                ) : null}
              </div>
            </div>
            <div></div>
          </div>
        </Wrapper>
      </div>
    );
  } else {
    <h2>Loading...</h2>;
  }
};

export default Profile;
