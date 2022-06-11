import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useState } from "react";
import { UserContext } from "../../components/UserContext";
import Wrapper from "../../components/Meals/MealWrapper";
import UserAddress from "../../components/user/Address";

const AddUser = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { user: userDB } = useContext(UserContext);
  const [streetAddress, setStreetAddress] = useState("");
  const [postCode, setPostCode] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");

  const handleSubmit = (e) => {
      e.preventDefaul();
      console.log(e.target.value)
      fetch(`api/user/add`, {
          method: "POST",
          headers: {"content-type": "application/json"},
          body: JSON.stringify({
            user,  
            streetAddress,
              postCode,
              city,
              province
          })
      })
      .then(res => res.json)
      .then((data) => {console.log(data)})
      .catch(err => console.log(err))
  };

  console.log("Auth0 user and email", user.name, user.email)

  return (
    <>
      <Wrapper>
        <h2>Thank you for subscribing to Dinner Swap.</h2>
        <h3>You have 50 points </h3>
        <p>We recommend the amazing banana bread ;-)</p>
        <h3>To finalize the process, please include the address where the meals can be picked up:</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="address"></label>
          <UserAddress
            streetAddress={streetAddress}
            setStreetAddress={setStreetAddress}
            postCode={postCode}
            setPostCode={setPostCode}
            city={city}
            setCity={setCity}
            province={province}
            setProvince={setProvince}
          />

          <input type="submit" value="Submit" />
        </form>
      </Wrapper>
    </>
  );
};

export default AddUser;
