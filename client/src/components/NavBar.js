import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

import { UserContext } from "./UserContext";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";

const Navbar = () => {
  const { isAuthenticated, user, isLoading } = useAuth0();
  const isUser = isAuthenticated && user;

  return (
    <Div user={isAuthenticated}>
      {isUser && user.picture && <img src={user.picture} alt={user.name} />}
      {isUser && user.name && <h3>Hi, {user.name}</h3>}
      <li>
        <NavLinkStyled to="/">Home</NavLinkStyled>
      </li>
      <li>
        <NavLinkStyled to="/profile">Profile</NavLinkStyled>
      </li>
      <li>
        <NavLinkStyled to="/meals">Meals</NavLinkStyled>
      </li>
      <li></li>
      <SignInButtons>
        <li>{isAuthenticated ? <LogoutButton /> : <LoginButton />}</li>
      </SignInButtons>
      {/* <SignInButtons>
        <StyledLoginBtn user={user}>
          <LoginButton />
        </StyledLoginBtn>
        <StyledLogoutBtn user={user}>
          <LogoutButton />
        </StyledLogoutBtn>
      </SignInButtons> */}
    </Div>
  );
};

export default Navbar;

const Div = styled.div`
  background-color: ${(p) =>
    p.user ? `var(--secondary-color)` : `var(--primary-color)`};
  /* background-color: var(--primary-color); */
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: var(--header-height);
  font-family: var(--heading-font-family);
  width: 100vw;
`;

const NavLinkStyled = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #ffffff;
  height: 100%;
  /* font-size: "40px"; */
  font-size: 20px;
  padding-left: 20px;
  padding-right: 20px;
`;

const SignInButtons = styled.div`
  display: flex;
  align-items: center;
  margin-right: 40px;
`;

const StyledLoginBtn = styled.li`
  visibility: ${(p) => (p.user ? "hidden" : "visible")};
`;

const StyledLogoutBtn = styled.li`
  visibility: ${(p) => (p.user ? "visible" : "hidden")};
`;
