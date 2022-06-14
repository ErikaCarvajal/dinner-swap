import { Link } from "react-router-dom";
import styled from "styled-components";
import burnedToast from "../images/burnedToast.png";

export const Error = ({ errorMessage }) => {
  return (
    <>
      <h2>{errorMessage}</h2>
      <Img src={burnedToast} />
      <Link to="/">Back Home</Link>
    </>
  );
};

export default Error;

const Img = styled.img`
  width: 30%;
  height: 30%;
  border-radius: 2em;
`;
