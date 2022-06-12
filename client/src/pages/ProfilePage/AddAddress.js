import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useState } from "react";
import { UserContext } from "../../components/UserContext";
import Wrapper from "../../components/Meals/MealWrapper";
import UserAddress from "../../components/user/Address";
import IsLogged from "./IsLogged";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { user: userDB } = useContext(UserContext);
  // const [streetAddress, setStreetAddress] = useState("");
  // const [postCode, setPostCode] = useState("");
  // const [city, setCity] = useState("");
  // const [province, setProvince] = useState("");

  const [address, setAddress ] = useState({
    streetNumber: "",
    streetName: "",
    city: "",
    postCode: "",
    province: ""
  })

  const handleSubmit = (e) => {    
    console.log("Handle submit before prevent default")
    e.preventDefaul();
    console.log("consologin the user submit")
    console.log(e.target.value);
    if (user) {
      fetch(`api/user/${userDB.email}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({...userDB,
          address: {
          user,
          streetAddress,
          postCode,
          city,
          province,}
        }),
      })
        .then((res) => res.json)
        .then((data) => {
          console.log(data);
          // {window.sessionStorage.setItem("email", JSON.stringify(user.email))}
          //   navigate('/')
        })
        .catch((err) => console.log(err));
    }
  };

  console.log("Auth0 user and email", user?.name, user?.email);
  console.log("userDB from Mongo", userDB?.name);

  return (
    <>
      <Wrapper>
        <h2>Thank you for subscribing to Dinner Swap.</h2>
        {/* <h3>You have 50 points </h3> */}
        <p>We recommend the amazing banana bread ;-)</p>
        <h3>
          To finalize the process, please include the address where the meals
          can be picked up:
        </h3>
        <form onSubmit={(e)=>handleSubmit(e)}>
          <label htmlFor="address"></label>
          <UserAddress address={address} setAddress={setAddress}/>
          {console.log(province, user)}
          <input type="submit" value="Submit" />
        </form>
      </Wrapper>
    </>
  );
};

export default AddUser;
