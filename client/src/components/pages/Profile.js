import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/auth/authContext";
import styled, { css } from "styled-components";
import { useHistory } from "react-router-dom";

const Profile = () => {
  const authContext = useContext(AuthContext);
  const history = useHistory();

  const [user, setUser] = useState({
    username: "",
  });

  useEffect(() => {
    scrollToTop();
    authContext.loadUser();
    if (!authContext.isAuthenticated) {
      history.push("/login");
    }
    if (authContext.user != null) {
      setUser({ username: authContext.user.name });
    }
  }, [authContext.user]);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <ProfileStyle>
      <div>{user.username}</div>
      <div>Comments</div>
      <div>Games</div>
    </ProfileStyle>
  );
};

const ProfileStyle = styled.div`
  max-width: 1200px;
  margin: 10rem auto;
  min-height: 26rem;
  font-size: 3rem;
  color: var(--font-color-white);
`;

export default Profile;
