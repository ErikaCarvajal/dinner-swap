import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useState, useRef } from "react";
import { UserContext } from "../../components/UserContext";
import Wrapper from "../../components/Meals/MealWrapper";
import UserAddress from "../../components/user/Address";
// import IsLogged from "./IsLogged";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const AddUser = ({
  setUpdateDone,
  userName,
  streetNumber,
  streetName,
  city,
  postCode,
  province,
}) => {
  const navigate = useNavigate();
  const selectProvince = useRef(null);
  const { user } = useAuth0();
  const { user: userDB } = useContext(UserContext);

  const provincesArray = [
    "Alberta",
    "British Columbia",
    "Manitoba",
    "New Brunswick",
    "Newfoundland and Labrador",
    "Northwest Territories",
    "Nova Scotia",
    "Nunavut",
    "Ontario",
    "Prince Edward Island",
    "Quebec",
    "Saskatchewan",
    "Yukon",
  ];

  const [address, setAddress] = useState({
    streetNumber,
    streetName,
    city,
    postCode,
    province
  });

  const [name, setName ] = useState({userName});
  const [error, setError] = useState(false);
  // setUpdateDone(false)

  const handleChange = (e) => {
    e.preventDefault();
    const key = e.target.name;
    const value = e.target.value;
    setAddress({ ...address, [key]: value });
    console.log("inside handleChange -error is", error);
  };

  const handleProvince = (e) => {
    e.preventDefault();
    setAddress({ ...address, province: e.target.value });
  };

  const handleName = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user) {
      fetch(`api/user/${userDB.email}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          address,
          name
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            console.log(data);
            setUpdateDone(true)
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <Wrapper>
        {/* {streetNumber === "" && ( */}
        <div>
          <h2>Thank you for subscribing to Dinner Swap.</h2>
          <h3>
            To finalize the process, please include the address where the meals
            can be picked up:
          </h3>
        </div>
        {/* )} */}
        <div>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="userName">Name</label>
            <input type="text" id="userName" name="userName" value={name.userName} onChange={(e) => handleName(e)}/>
            <label htmlFor="streetNumber">Street Number</label>
            <input
              type="tel"
              id="streetNumber"
              name="streetNumber"
              maxLength="6"
              value={address.streetNumber}
              onChange={(e) => handleChange(e)}
              required={true}
            />

            <label htmlFor="streetName">Street Name</label>
            <input
              type="text"
              id="streetName"
              name="streetName"
              value={address.streetName}
              onChange={(e) => handleChange(e)}
              required={true}
            />

            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={address.city}
              onChange={(e) => handleChange(e)}
              required={true}
            />

            <label htmlFor="postCode">Postal Code</label>
            <input
              type="text"
              id="postCode"
              minLength="6"
              maxLength="7"
              name="postCode"
              value={address.postCode}
              onChange={(e) => handleChange(e)}
              required={true}
            />

            <select
              ref={selectProvince}
              onChange={(e) => handleProvince(e)}
              name="province"
            >
            {province.length > 0 ? (
              <option value={address.province}>{address.province}</option>
            ): (<option value="Choose a province">--Province--</option>)}
              {provincesArray.map((province) => {
                return (
                  <option key={province} value={province}>
                    {province}
                  </option>
                );
              })}
            </select>
            <input type="submit" value="Submit" />
          </Form>
        </div>
      </Wrapper>
    </>
  );
};

export default AddUser;

const Form = styled.form`
  /* display: flex;
  flex-direction: column; */
`;
