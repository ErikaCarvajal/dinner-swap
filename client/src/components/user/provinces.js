import { useState, useRef } from "react";
import styled from "styled-components";

export const Provinces = ({ province, setProvince }) => {
  const selectForm = useRef(null);

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

  const handleSubmit = (e) => {
      e.preventDefault();
      setProvince(e.target.value)
  }


  return (
    <>
      <form ref={selectForm} onChange={(e)=> handleSubmit(e)}>

        <label htmlFor="province">Province</label>
        <Select name="province" placeholder="Choose a province">
        <option value="Choose a province">--Province--</option>
          {provincesArray.map((province) => {
              return (
            <option key={province} value={province}>
              {province}
            </option>)
          })}
        </Select>
      </form>
    </>
  );
};

const Select = styled.select`
width: 300px;
`;