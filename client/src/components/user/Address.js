import { useState } from "react";
import styled from "styled-components";
import { Provinces } from "./provinces";

const UserAddress = ({
  streetAddress,
  setStreetAddress,
  postCode,
  setPostCode,
  city,
  setCity,
  province,
  setProvince,
}) => {
  const [warningMessage, setWarningMessage] = useState("");
  const [displayWarning, setDisplayWarning] = useState(false);

  const handleStreetAddress = (e) => {
      if (e.target.value === "" || /^[a-zA-Z\s\d\/]*\d[a-zA-Z\s\d\/]*$/.test(e.target.value)) { 
          setStreetAddress(e.target.value);
        }
      };
      

  const handlePostCode = (e) => {
    const validPostCode = new RegExp(/[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d/);

    let result = validPostCode.test(e.target.value);
    setPostCode(e.target.value);

    if (e.target.valuet === "" || result) {
      setDisplayWarning(false);
      setWarningMessage("");
    } else {
      setDisplayWarning(true);
      setWarningMessage("Please enter valid Post Code");
    }
  };

  const handleCity = (e) => {
    if (e.target.value === "" || /^[a-z A-ZÀ-ÿ]*$/.test(e.target.value)) {
      setCity(e.target.value);
    }
  };
  // console.log("provinces ", provinces)
  // const handleProvince = (e) => {
  //   setProvince(e.target.value);
  // };

  return (
    <Wrapper>
      <div>
        <Address>

          <label htmlFor="streetAddress">Street Address</label>
          <input
            className="streetAddress"
            type="text"
            name="streetAddress"
            placeholder="Street Address"
            required
            value={streetAddress}
            onChange={(e) => handleStreetAddress(e)}
          />
        </Address>

        <AddressDetail>
          <label htmlFor="city">City</label>
          <input
            type="text"
            name="city"
            required
            value={city}
            placeholder="City"
            onChange={(e) => handleCity(e)}
          />
          <label htmlFor="postcode">Post Code</label>

          <input
            type="text"
            name="postcode"
            maxLength="6"
            required
            value={postCode}
            placeholder="Post Code"
            onChange={(e) => handlePostCode(e)}
          />
          {displayWarning && <p>*{warningMessage}</p>}
        </AddressDetail>
        <Provinces province={province} setProvince={setProvince} />
       
        {/* <form  ref={selectForm} >
          <label htmlFor="province">Province</label>
          <Select onChange={(e) => handleProvince(e)}>
            {provinces.map((province) => {
              <option key={province} value={province}>
                {province}
              </option>;
            })}
          </Select>
        </form> */}
       
       
            {/* <option value="Alberta">Alberta</option>
            <option value="British Columbia">British Columbia</option>
            <option value="Manitoba">Manitoba</option>
            <option value="New Brunswick">New Brunswick</option>
            <option value="Newfoundland and Labrador">
              Newfoundland and Labrador
            </option>
            <option value="Northwest Territories">Northwest Territories</option>
            <option value="Nova Scotia">Nova Scotia</option>
            <option value="Nunavut">Nunavut</option>
            <option value="Ontario">Ontario</option>
            <option value="Prince Edward Island">Prince Edward Island</option>
            <option value="Quebec">Quebec</option>
            <option value="Saskatchewan">Saskatchewan</option>
            <option value="Yukon">Yukon</option> */}
      </div>
    </Wrapper>
  );
};
export default UserAddress;

const Wrapper = styled.div`
  margin-left: 50px;

  form {
    display: flex;
    flex-direction: column;
  }

  label {
    margin-top: 20px;
    /* text-align: left; */
  }

  input {
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #f2f2f2;
  }

  select {
    padding: 5px;
    margin-top: 5px;
    border: 1px solid #f2f2f2;
  }
`;

const Address = styled.div`
  display: inline-block;
  margin-top: 10px;

  label {
    margin-right: 5px;
  }

  input {
    margin-right: 15px;
  }

  .streetName {
    width: 350px;
  }
`;

const AddressDetail = styled.div`
  display: inline-block;
  margin-top: 10px;

  label {
    margin-right: 5px;
  }

  input {
    margin-right: 15px;
  }

  p {
    margin-top: 8px;
    font-size: 12px;
    color: red;
  }
`;


