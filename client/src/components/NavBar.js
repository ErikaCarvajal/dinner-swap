import { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

//TO ADD LATER ON:
import { UserContext } from "./UserContext";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";

const Navbar = () => {
    // To add when we have the user Context
  const { user } = useContext(UserContext);

  return (
    <Div>
      <li>
        <NavLinkStyled to="/">Home</NavLinkStyled>
      </li>
      <li>
      <NavLinkStyled to="/profile">Profile</NavLinkStyled>
      </li>
      <NavLinkStyled to="/meals">Meals</NavLinkStyled>

      <div>
      <li>
        {user ? (
          <NavLinkStyled2 to="/signin">Hello, {user.name}</NavLinkStyled2>
        ) : (
          <NavLinkStyled to="/signin">Sign In</NavLinkStyled>
        )}
      </li>
      <LoginButton />
      <LogoutButton />
      </div>
    </Div>
  );
};

export default Navbar;

const Div = styled.div`
  background-color: var(--primary-color);
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
  font-size: ${(p) => (p.secondary ? "20px" : "20px")};
  padding-left: 20px;
  padding-right: 20px;
`;

const NavLinkStyled2 = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #ffffff;
  height: 100%;
  /* font-size: "40px"; */
  font-size: ${(p) => (p.secondary ? "25px" : "40px")};
  padding-left: 20px;
  padding-right: 20px;
  :hover {
    pointer-events: none;
    cursor: default;
  }
`;