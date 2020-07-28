import React, { useContext } from "react";
import PropTypes from "prop-types";
import { NavLink, Link, useHistory } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

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
  return (
    <nav className="navbar bg-primary">
      <h1>
        <i className={icon}></i> <Link to="/">{title}</Link>
      </h1>
      <ul>
        <li>
          <Link to="login">Login</Link>
        </li>
        <li>
          <Link to="register">Register</Link>
        </li>
        <li>
          <div onClick={onClick}>Logout</div>
        </li>
      </ul>
    </nav>
  );
};

Navbar.defaultProps = {
  title: "Games Forum",
  icon: "fa fa-gamepad",
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default Navbar;
