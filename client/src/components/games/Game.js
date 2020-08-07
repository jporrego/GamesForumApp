import React, { useEffect, useState, useContext } from "react";
import styled, { css } from "styled-components";
import { useLocation } from "react-router-dom";
import Comments from "../comments/Comments";
import GameContext from "../../context/game/gameContext";
import AuthContext from "../../context/auth/authContext";
import { useHistory } from "react-router-dom";
import axios from "axios";

function Game() {
  const gameContext = useContext(GameContext);
  const authContext = useContext(AuthContext);
  const history = useHistory();

  const game = gameContext.selectedGame;

  useEffect(() => {
    scrollToTop();
    authContext.loadUser();
  }, [authContext.isAuthenticated]);

  useEffect(() => {
    checkIfFollows();
  }, [authContext.isAuthenticated]);

  const [isFollowed, setIsFollowed] = useState(false);

  const followGame = async () => {
    if (!authContext.isAuthenticated) {
      history.push("/login");
    } else {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const payload = {
        user_account_id: authContext.user.user_account_id,
        game_id: gameContext.selectedGame.game_id,
      };
      try {
        const res = await axios.post(
          "http://localhost:5000/api/followers",
          payload,
          config
        );
        checkIfFollows();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const checkIfFollows = async () => {
    if (authContext.isAuthenticated) {
      try {
        const currentUserFollow = await axios.get(
          "http://localhost:5000/api/followers/",
          {
            params: {
              user_account_id: authContext.user.user_account_id,
              game_id: gameContext.selectedGame.game_id,
            },
          }
        );
        if (currentUserFollow.data.length > 0) {
          setIsFollowed(true);
        } else {
          setIsFollowed(false);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const followButton = <FollowButton onClick={followGame}>Follow</FollowButton>;
  const unfollowButton = (
    <UnfollowButton onClick={followGame}>Unfollow</UnfollowButton>
  );

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  if (game != undefined) {
    return (
      <GameStyle>
        <GameBackground image={game.img}>123</GameBackground>
        <GameInfo>
          <GameImg src={gameContext.selectedGame.img} alt="" />
          <GameTitle>{game.title}</GameTitle>
          <GameSummary>{game.summary}</GameSummary>
          <GamePlatform>{game.platform}</GamePlatform>
          <GameDate>{game.date}</GameDate>
          <FollowersCount>
            <div>Followers</div>
            <h3>{game.follow_count}</h3>
          </FollowersCount>
          <CommentCount>
            <div>Comments</div>
            <h3>{game.comment_count}</h3>
          </CommentCount>
          {!isFollowed ? followButton : unfollowButton}
        </GameInfo>
        <Comments></Comments>
      </GameStyle>
    );
  } else {
    return <div>12</div>;
  }
}
const GameStyle = styled.div`
  max-width: 1200px;
  margin: 10rem auto;
  min-height: 26rem;
`;

const GameBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -5;
  background-image: url(${(props) => props.image});
  background-repeat: repeat;
  background-size: cover;
  filter: blur(50px);
`;

const GameInfo = styled.div`
  display: grid;
  grid-template-columns: 30% 40% repeat(2, 1fr);
  grid-template-rows: max-content 1fr max-content;
  background-color: var(--dark-color);
  border-top: 5px solid var(--primary-color);
  color: var(--font-color-white);
`;

const GameImg = styled.img`
  grid-row: 1/-1;
  height: 100%;
  object-fit: cover;
  object-position: 50% 50%;
  transition: all 0.15s ease-out;
`;
const GameTitle = styled.h1`
  grid-row: 1/2;
  grid-column: 2/3;
  font-size: 2.2rem;
  font-weight: 700;
  justify-self: center;
  align-self: start;
  padding: 1.5rem 1.5px;
  letter-spacing: 3px;
  text-align: center;
`;

const GameSummary = styled.div`
  grid-row: 2/4;
  grid-column: 2/3;
  font-size: 1.5rem;
  font-weight: 300;
  justify-self: center;
  align-self: center;
  padding: 1rem 2rem;
`;

const GamePlatform = styled.div`
  grid-row: 1/2;
  grid-column: 3/4;
  justify-self: center;
  align-self: center;
  font-size: 1.6rem;
  font-weight: 600;
  text-align: center;
`;

const GameDate = styled.div`
  grid-row: 1/2;
  grid-column: 4/5;
  justify-self: center;
  align-self: center;
  font-size: 1.6rem;
  font-weight: 600;
  text-align: center;
`;
const FollowersCount = styled.div`
  grid-row: 2/3;
  grid-column: 3/4;
  display: grid;
  justify-self: center;
  align-self: start;
  justify-items: center;
  font-size: 1.8rem;
  font-weight: 600;
  margin-top: 3rem;
  text-transform: uppercase;

  & h3 {
    color: var(--primary-color);
    font-size: 2.5rem;
    font-weight: 700;
  }
`;
const CommentCount = styled.div`
  grid-row: 2/3;
  grid-column: 4/5;
  display: grid;
  justify-self: center;
  align-self: start;
  justify-items: center;
  font-size: 1.8rem;
  font-weight: 600;
  text-transform: uppercase;
  margin-top: 3rem;

  & h3 {
    color: var(--primary-color);
    font-size: 2.3rem;
    font-weight: 700;
  }
`;

const FollowButton = styled.div`
  grid-row: 3/4;
  grid-column: 3/5;
  justify-self: center;
  align-self: center;
  padding: 0.3rem 1rem;
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 3rem;
  text-transform: uppercase;
  border-radius: 0.6rem;
  background-color: var(--primary-color);
  user-select: none;
  cursor: pointer;
  transition: all 0.15s ease-out;

  &:hover {
    background-color: var(--primary-color);
    transform: translateY(-3px);
    box-shadow: 0px 0px 20px var(--primary-color);
  }

  &:active {
    background-color: var(--primary-color);
    transform: translateY(-1px);
    box-shadow: 0px 1px 10px var(--primary-color);
  }
`;

const UnfollowButton = styled.div`
  grid-row: 3/4;
  grid-column: 3/5;
  justify-self: center;
  align-self: center;
  padding: 0.3rem 1rem;
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 3rem;
  text-transform: uppercase;
  border-radius: 0.6rem;
  background-color: var(--red-color);
  user-select: none;
  cursor: pointer;
  transition: all 0.15s ease-out;

  &:hover {
    background-color: var(--red-color);
    transform: translateY(-3px);
    box-shadow: 0px 0px 20px var(--red-color);
  }

  &:active {
    background-color: var(--red-color);
    transform: translateY(-1px);
    box-shadow: 0px 1px 10px var(--red-color);
  }
`;

export default Game;
