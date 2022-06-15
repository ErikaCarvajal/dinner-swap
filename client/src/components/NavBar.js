import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

import { UserContext } from "./UserContext";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";

import { GiCircleClaws } from "react-icons/gi";

const Navbar = () => {
  const { isAuthenticated, user, isLoading } = useAuth0();
  const isUser = isAuthenticated && user;

  return (
    <Div user={isAuthenticated}>
      <Greeting>
        <Avatar>
          {isUser && user.picture && <Img src={user.picture} alt={user.name} />}
        </Avatar>
      </Greeting>
      <li>
        <NavLinkStyled to="/" user={isAuthenticated}>
          Meal Swap <GiCircleClaws />
        </NavLinkStyled>
      </li>
      <li>
        <NavLinkStyled to="/profile" user={isAuthenticated}>
          Profile
        </NavLinkStyled>
      </li>
      <li>
        <NavLinkStyled to="/meals" user={isAuthenticated}>
          Meals
        </NavLinkStyled>
      </li>
      <li></li>
      <SignInButtons>
        <li>{isAuthenticated ? <LogoutButton /> : <LoginButton />}</li>
      </SignInButtons>
    </Div>
  );
};

export default Navbar;

const Div = styled.div`
  background-color: ${(p) =>
    p.user ? `var(--secondary-color)` : `var(--primary-color)`};
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: var(--header-height);
  width: 100vw;
  font-family: var(--heading-font-family);
`;

const NavLinkStyled = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${(p) => (p.user ? `var(--primary-color)` : `var(--secondary-color)`)};
  height: 100%;
  font-size: 20px;
  padding-left: 20px;
  padding-right: 20px;
`;

const SignInButtons = styled.div`
  display: flex;
  align-items: center;
  margin-right: 40px;
`;

const Greeting = styled.div`
  display: flex;
  align-items: center;
`;

const Img = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
  column-gap: 10px;
`;

const Avatar = styled.div`
  width: 40px;
  margin-left: 20px;
  margin-right: 10px;
`;
