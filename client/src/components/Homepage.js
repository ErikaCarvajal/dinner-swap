import styled from "styled-components";
import salmon from "../images/salmon.jpg";

const Homepage = () => {
  console.log("from Homepage frontEnd");

  return (
    <div>
      <Div style={{ backgroundImage: `url(${salmon})` }}>
        <H1>
          Welcome to Dinner Swingers Because we are all good at least at one
          thing!
        </H1>
      </Div>
    </div>
  );
};

export default Homepage;

const Div = styled.div`
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const H1 = styled.h1`
  color: floralwhite;
  display: flex;
  justify-content: center;
  text-align: center;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
`;
