import React, { useState, useEffect, useContext, Fragment } from "react";
import axios from "axios";
import AuthContext from "../../context/auth/authContext";
import GameContext from "../../context/game/gameContext";
import { useHistory } from "react-router-dom";
import styled, { css } from "styled-components";

const Reply = ({ comment }) => {
  const authContext = useContext(AuthContext);
  const gameContext = useContext(GameContext);
  const history = useHistory();

  const { comment_id } = comment;

  const [replyText, setReplyText] = useState("");

  const onChange = (e) => {
    if (/*!authContext.isAuthenticated*/ false) {
      history.push("/login");
    } else {
      setReplyText(e.target.value);
    }
  };

  const onSubmit = async (e) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (replyText === "") {
      return;
    }

    const payload = {
      user_account_id: authContext.user.user_account_id,
      replied_comment_id: comment_id,
      comment_text: replyText,
    };
    try {
      const res = await axios.post(
        "http://localhost:5000/api/comments",
        payload,
        config
      );
      setReplyText("");
      //getComments();
      //setAddReply(false);
    } catch (err) {
      console.log(err);
    }
  };

  const submitButton = (
    <ReplySubmit type="button" value="+" onClick={onSubmit}></ReplySubmit>
  );

  return (
    <div>
      <ReplyStyle>
        <ReplyForm id="commentForm">
          <ReplyInput
            name="replyText"
            placeholder="Your reply..."
            form="commentForm"
            type="text"
            value={replyText}
            onChange={onChange}
          ></ReplyInput>
          {replyText && submitButton}
        </ReplyForm>
      </ReplyStyle>
    </div>
  );
};

const ReplyStyle = styled.div`
  display: grid;
  min-height: 10rem;
  color: var(--font-color-white);
  background-color: var(--bg-color);
  font-size: 1.6rem;
  font-weight: 400;
  padding: 1rem 1.5rem;
  border-style: none;
  border-radius: 0.6rem;
  border-top: 3px solid var(--primary-color);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.4);

  cursor: text;
  transition: all 0.15s ease-out;
`;

const ReplyForm = styled.form`
  display: grid;
  grid-template-columns: 1fr max-content;
`;

const ReplyInput = styled.textarea`
  width: 100%;
  height: 100%;
  border-style: none;
  color: var(--font-color-white);
  background-color: var(--bg-color);
  font-size: 1.6rem;
  font-weight: 400;
  word-wrap: normal;
  resize: none;
  outline: none;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  &::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: var(--font-color-white);
    opacity: 1; /* Firefox */
  }
`;

const ReplySubmit = styled.input`
  border-style: none;
  width: max-content;
  height: max-content;
  color: var(--font-color-white);
  background-color: var(--primary-color);
  align-self: end;
  font-size: 1.4rem;
  text-transform: uppercase;
  font-weight: 700;
  padding: 0.7rem 1.2rem;
  word-wrap: normal;
  border-radius: 200px;
  resize: none;
  outline: none;
  cursor: pointer;
  transition: all 0.15s ease-out;

  &:hover {
    transform: translateY(-3px);
  }

  &:active {
    transform: translateY(-1px);
  }
`;

export default Reply;
