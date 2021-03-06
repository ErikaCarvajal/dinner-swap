import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useRef } from "react";

import Error from "../Error";
import { UserContext } from "../../components/UserContext";

const EditUser = ({
  userName,
  streetNumber,
  streetName,
  city,
  postCode,
  province,
  setCurrentTab,
}) => {
  const navigate = useNavigate();
  const selectProvince = useRef(null);
  const { user } = useAuth0();
  const { user: userDB, updateDone, setUpdateDone } = useContext(UserContext);

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
    province,
  });

  const [name, setName] = useState(userName);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    const key = e.target.name;
    const value = e.target.value;
    setAddress({ ...address, [key]: value });
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
          name,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            setUpdateDone(!updateDone);
            setCurrentTab("");
          }
        })
        .catch((err) => setError(true));
    }
  };

  return (
    <>
      {!error ? (
        <Wrapper>
          <div>
            <h3>Please update your Name and address:</h3>
          </div>
          <div>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div>
                <label htmlFor="userName">Name</label>
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  value={name}
                  onChange={(e) => handleName(e)}
                />
              </div>

              <AddressStyling>
                <label htmlFor="streetNumber">Street Number</label>
                <StreetNumber
                  type="tel"
                  id="streetNumber"
                  name="streetNumber"
                  maxLength="6"
                  value={address.streetNumber}
                  onChange={(e) => handleChange(e)}
                  required={true}
                />

                <label htmlFor="streetName">Street Name</label>
                <StreetName
                  type="text"
                  id="streetName"
                  name="streetName"
                  value={address.streetName}
                  onChange={(e) => handleChange(e)}
                  required={true}
                />
              </AddressStyling>

              <AddressStyling>
                <label htmlFor="city">City</label>
                <City
                  type="text"
                  id="city"
                  name="city"
                  value={address.city}
                  onChange={(e) => handleChange(e)}
                  required={true}
                />

                <label htmlFor="postCode">Postal Code</label>
                <PostalCode
                  type="text"
                  id="postCode"
                  minLength="6"
                  maxLength="7"
                  name="postCode"
                  value={address.postCode}
                  onChange={(e) => handleChange(e)}
                  required={true}
                />
              </AddressStyling>

              <select
                ref={selectProvince}
                onChange={(e) => handleProvince(e)}
                name="province"
              >
                {province.length > 0 ? (
                  <option value={address.province}>{address.province}</option>
                ) : (
                  <option value="Choose a province">--Province--</option>
                )}
                {provincesArray.map((province) => {
                  return (
                    <option key={province} value={province}>
                      {province}
                    </option>
                  );
                })}
              </select>
              <SubmitInput type="submit" value="Submit" />
            </form>
          </div>
        </Wrapper>
      ) : (
        <Error />
      )}
    </>
  );
};

export default EditUser;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: var(--secondary-color);
  margin-left: -10px;
  width: 110%;
  box-shadow: 1px 8px 12px 0 black;
  padding: 12px 25px;
  position: relative;

  h3 {
    margin-bottom: 10px;
  }

  input {
    font-family: var(--others-font-family);
    border-radius: 5px;
    border-bottom: 3px solid var(--primary-color);
    border-right: 3px solid var(--primary-color);
    border-top: 2px solid var(--tertiary-color);
    border-left: 2px solid var(--tertiary-color);
  }

  label {
    font-family: var(--others-font-family);
    margin-right: 5px;
  }
  select {
    font-family: var(--others-font-family);
    border-radius: 5px;
    border-bottom: 3px solid var(--primary-color);
    border-right: 3px solid var(--primary-color);
    border-top: 2px solid var(--tertiary-color);
    border-left: 2px solid var(--tertiary-color);
  }
`;

const AddressStyling = styled.div`
  margin: 8px 0;
`;

const StreetNumber = styled.input`
  width: 50px;
  margin-right: 5px;
`;

const StreetName = styled.input`
  width: 159px;
`;

const City = styled.input`
  width: 178px;
  margin-right: 5px;
`;
const PostalCode = styled.input`
  width: 100px;
`;

const SubmitInput = styled.input`
  cursor: pointer;
  margin-left: 20%;
  background-color: var(--primary-color);
  color: var(--secondary-color);
  border: none;
  border-radius: 0.25rem;
  padding: 0.4rem 0.8rem;
`;
