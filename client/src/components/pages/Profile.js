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
    comments: 0,
    follows: 0,
  });

  useEffect(() => {
    scrollToTop();
    authContext.loadUser();
    if (!authContext.isAuthenticated) {
      history.push("/login");
    }
    if (authContext.user != null) {
      getUserStats();
    }
  }, [authContext.isAuthenticated]);

  const getUserStats = async () => {
    try {
      const commentCount = await axios.get(
        "http://localhost:5000/api/comments",
        {
          params: {
            user_id: authContext.user.user_account_id,
          },
        }
      );
      const followCount = await axios.get(
        "http://localhost:5000/api/followers",
        {
          params: {
            user_account_id: authContext.user.user_account_id,
          },
        }
      );
      setUser({
        ...user,
        username: authContext.user.name,
        profile_pic: authContext.user.profile_pic,
        comments: commentCount.data,
        follows: followCount.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const onChange = async (e) => {
    const uploadedImg = e.target.files[0];
    const formData = new FormData();

    formData.append("img", uploadedImg);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const res = await axios.put(
        "http://localhost:5000/api/users/",
        formData,
        config
      );

      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target.value);
    /*const uploadedImg = e.target.files[0];
    const formData = new FormData();

    formData.append("img", uploadedImg);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const res = await axios.put(
      "http://localhost:5000/api/users/",
      formData,
      config
    );

    console.log(res.data);*/
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <ProfileStyle>
      <User>
        <form enctype="multipart/form-data" onSubmit={onSubmit}>
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
            /*onChange={onChange}*/
          />
          <input type="submit" value="1" />
        </form>
        {user.username}
      </User>
      <Comments>
        <div>Comments</div> {user.comments}
      </Comments>
      <Follows>
        <div>Follows</div> {user.follows}
      </Follows>
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
const Comments = styled.div`
  display: grid;
  grid-template-rows: max-content max-content;
`;
const Follows = styled.div`
  display: grid;
  grid-template-rows: max-content max-content;
`;

export default Profile;
