import { Link } from "react-router-dom";
import styled from "styled-components";
import burnedToast from "../images/burnedToast.png";

export const Error = ({ errorMessage }) => {
  return (
    <Div>
      <Wrapper>
        <div>
          <h2>Oops! Something went wrong!</h2>
        </div>
        <div>
          <Img src={burnedToast} />
        </div>
        <div>
          <LinkStyle to="/">Back Home</LinkStyle>
        </div>
      </Wrapper>
    </Div>
  );
};

export default Error;

const Wrapper = styled.div`
  flex-wrap: wrap;
  background-color: var(--secondary-color);
  width: 50%;
  box-shadow: 1px 8px 12px 0 black;
  padding: 50px;
`;

const Div = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px;
`;

const Img = styled.img`
  justify-content: center;
  margin-bottom: 10px;
  padding: 20px 0;
  width: 70%;
  border-radius: 120px 20px;
  object-fit: cover;
`;

const LinkStyle = styled(Link)`
  text-decoration: none;
  font-family: var(--heading-font-family);
  color: var(--primary-color);
  font-weight: bolder;
  border: 2px solid var(--tertiary-color);
  padding: 10px;
  border-radius: 50px;

  :hover {
    background-color: var(--primary-color);
    border: none;
    color: white;
  }
`;
