import React, { useState, useEffect, useContext, Fragment } from "react";
import AuthContext from "../../context/auth/authContext";
import { useHistory } from "react-router-dom";
import axios from "axios";
import styled, { css } from "styled-components";

const Likes = ({ comment }) => {
  const authContext = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    getLikes();
    getUserLike();
  }, []);

  const { comment_id } = comment;

  const [likes, setLikes] = useState(0);
  const [userLike, setUserLike] = useState("");

  const voteComment = async (e) => {
    if (!authContext.isAuthenticated) {
      history.push("/login");
    } else {
      const value = e.target.id;
      const id_value = comment_id;

      let previousVote;

      try {
        previousVote = await axios.get("http://localhost:5000/api/votes/", {
          params: {
            checkIfUserVoted: true,
            comment_id: id_value,
            user_account_id: authContext.user.user_account_id,
          },
        });

        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const payload = {
          user_account_id: authContext.user.user_account_id,
          comment_id: id_value,
        };

        let res;

        if (previousVote.data.length > 0) {
          if (previousVote.data[0].positive_vote && value === "like") {
            payload.remove_vote = true;

            res = await axios.post(
              "http://localhost:5000/api/votes",
              payload,
              config
            );
          } else if (
            !previousVote.data[0].positive_vote &&
            value === "dislike"
          ) {
            payload.remove_vote = true;

            res = await axios.post(
              "http://localhost:5000/api/votes",
              payload,
              config
            );
          } else if (
            previousVote.data[0].positive_vote &&
            value === "dislike"
          ) {
            payload.remove_vote = true;

            res = await axios.post(
              "http://localhost:5000/api/votes",
              payload,
              config
            );

            payload.remove_vote = false;
            payload.positive_vote = false;

            res = await axios.post(
              "http://localhost:5000/api/votes",
              payload,
              config
            );
          } else {
            payload.remove_vote = true;

            res = await axios.post(
              "http://localhost:5000/api/votes",
              payload,
              config
            );

            payload.remove_vote = false;
            payload.positive_vote = true;

            res = await axios.post(
              "http://localhost:5000/api/votes",
              payload,
              config
            );
          }
        } else {
          if (value === "like") {
            payload.positive_vote = true;

            res = await axios.post(
              "http://localhost:5000/api/votes",
              payload,
              config
            );
          } else {
            payload.positive_vote = false;

            res = await axios.post(
              "http://localhost:5000/api/votes",
              payload,
              config
            );
          }
        }
      } catch (err) {
        console.log(err);
      }

      getLikes();
      getUserLike();
    }
  };

  const getLikes = async () => {
    const payload = comment_id;

    const res = await axios.get("http://localhost:5000/api/votes", {
      params: {
        comment_id: payload,
        checkIfUserVoted: false,
      },
    });

    let positive = 0;
    let negative = 0;

    for (const vote of res.data) {
      if (vote.positive_vote) {
        positive += 1;
      } else {
        negative += 1;
      }
    }

    setLikes(positive - negative);
  };

  const getUserLike = async () => {
    const id_value = comment_id;

    try {
      const currentUserLike = await axios.get(
        "http://localhost:5000/api/votes/",
        {
          params: {
            checkIfUserVoted: true,
            comment_id: id_value,
            user_account_id: authContext.user.user_account_id,
          },
        }
      );

      if (currentUserLike.data.length > 0) {
        if (currentUserLike.data[0].positive_vote) {
          setUserLike("Like");
        } else {
          setUserLike("Dislike");
        }
      } else {
        setUserLike("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const likeArrowWhite = (
    <i
      className="fa fa-sort-asc"
      onClick={voteComment}
      id="like"
      style={{ color: "var(--font-color-white)" }}
    ></i>
  );

  const likeArrowBlue = (
    <i
      className="fa fa-sort-asc"
      onClick={voteComment}
      id="like"
      style={{ color: "var(--primary-color)" }}
    ></i>
  );

  const dislikeArrowWhite = (
    <i
      className="fa fa-sort-desc"
      onClick={voteComment}
      id="dislike"
      style={{ color: "var(--font-color-white)" }}
    ></i>
  );

  const dislikeArrowBlue = (
    <i
      className="fa fa-sort-desc"
      onClick={voteComment}
      id="dislike"
      style={{ color: "var(--red-color)" }}
    ></i>
  );
  return (
    <LikesStyle>
      {userLike === "Like" ? likeArrowBlue : likeArrowWhite}
      <div>{likes}</div>
      {userLike === "Dislike" ? dislikeArrowBlue : dislikeArrowWhite}
    </LikesStyle>
  );
};

const LikesStyle = styled.div`
  grid-row: 1/-1;
  grid-column: 1/2;
  display: grid;
  justify-items: center;
  align-items: center;
  justify-self: center;
  align-self: center;

  & i {
    font-size: 1.8rem;
  }
  & i:hover {
    cursor: pointer;
    color: var(--primary-color);
  }
`;

export default Likes;
