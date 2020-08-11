import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/auth/authContext";
import styled, { css } from "styled-components";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Profile = () => {
  const authContext = useContext(AuthContext);
  const history = useHistory();

  const [user, setUser] = useState({
    username: "",
    profile_pic: "",
  });

  useEffect(() => {
    scrollToTop();
    authContext.loadUser();
    if (!authContext.isAuthenticated) {
      history.push("/login");
    }
    if (authContext.user != null) {
      setUser({
        username: authContext.user.name,
        profile_pic: authContext.user.profile_pic,
      });
    }
  }, [authContext.user]);

  const onChange = (e) => {
    const uploadedImg = e.target.files[0];

    const res = axios.put();
    console.log(uploadedImg);
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <ProfileStyle>
      <User>
        <form action="">
          <ImgLabel htmlFor="img">
            <ProfileImg
              src={
                user.profile_pic
                  ? require(`../../img/${user.profile_pic}`)
                  : require("../../img/default_profile_pic.png")
              }
              alt="profilepic"
            />
          </ImgLabel>
          <ImgInput
            type="file"
            name="img"
            id="img"
            accept=".png, .jpg, .jpeg"
            onChange={onChange}
          />
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
  width: 14rem;
  margin-bottom: 1rem;
  border-radius: 50%;
  object-fit: cover;
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
