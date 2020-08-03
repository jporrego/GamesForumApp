import React, { Fragment, useContext } from "react";
import PropTypes from "prop-types";
import { NavLink, Link, useHistory } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import styled, { css } from "styled-components";

const Navbar = ({ icon, title }) => {
  const authContext = useContext(AuthContext);
  const history = useHistory();

  const onClick = () => {
    authContext.logout();
    setTimeout(
      history.push({
        pathname: "/",
      }),
      6000
    );
  };

  const userLinks = (
    <Fragment>
      <li>
        <Link to="/profile">Profile</Link>
      </li>
      <li>
        <Link onClick={onClick} to="">
          Logout
        </Link>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to="login">Login</Link>
      </li>
      <li>
        <Link to="register">Register</Link>
      </li>
    </Fragment>
  );
  return (
    <NavbarStyle>
      <NavbarTitle>
        <i className={icon}></i> <Link to="/">Games Forum</Link>
      </NavbarTitle>
      <NavbarLinks>
        {authContext.isAuthenticated ? userLinks : guestLinks}
      </NavbarLinks>
    </NavbarStyle>
  );
};
const NavbarStyle = styled.nav`
  width: 100%;
  display: grid;
  grid-template-columns: minmax(1rem, 15rem) max-content 1fr minmax(1rem, 15rem);
  background-color: var(--dark-color);
  color: var(--font-color-white);
  padding: 1rem 0rem;

  & li {
    padding: 0px 3rem;
  }
`;
const NavbarTitle = styled.div`
  grid-column: 2/3;
  font-size: 2rem;
`;

const NavbarLinks = styled.ul`
  grid-column: 3/4;
  display: flex;
  justify-content: flex-end;
  font-size: 1.6rem;
`;
Navbar.defaultProps = {
  icon: "fa fa-gamepad",
};

Navbar.propTypes = {
  icon: PropTypes.string.isRequired,
};

export default Navbar;
