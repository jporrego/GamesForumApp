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
      <User>
        <form action="">
          <ImgLabel htmlFor="img">
            <ProfileImg
              src={require("../../img/iconmonstr-user-19-240.png")}
              alt="123"
            />
          </ImgLabel>
          <ImgInput type="file" name="img" id="img" accept="image/*" />
        </form>
        {user.username}
      </User>
      <Comments>Comments</Comments>
      <Follows>Follows</Follows>
    </ProfileStyle>
  );
};

const ProfileStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 1fr 1fr;
  max-width: 40rem;
  margin: 10rem auto;
  font-size: 3rem;
  color: var(--font-color-white);
  background-color: var(--dark-color);
  justify-items: center;
  padding: 2rem;
  text-align: center;
`;
const User = styled.div`
  grid-column: 1/-1;
  display: grid;
  justify-content: center;
  border-bottom: 3px solid var(--primary-color);
  width: 100%;
  padding-bottom: 1rem;
  margin-bottom: 3rem;
`;

const ProfileImg = styled.img`
  height: 14rem;
  width: auto;
  margin-bottom: 1rem;
`;

const ImgInput = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

const ImgLabel = styled.label`
  cursor: pointer;
`;
const Comments = styled.div``;
const Follows = styled.div``;

export default Profile;
