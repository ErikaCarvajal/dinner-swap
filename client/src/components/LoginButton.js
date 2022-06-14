import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <>
      <Button onClick={() => loginWithRedirect()}>Log In</Button>
    </>
  );
};

export default LoginButton;

const Button = styled.button`
  font-family: var(--heading-font-family);
  background: none;
  color: var(--secondary-color);
  border: none;
  font-size: 20px;
  cursor: pointer;
`;
