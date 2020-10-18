import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { getGames, deleteGame } from "../utils/api";
import Account from "../components/Account";
import useAuth from "../hooks/useAuth";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import logo from "../images/logo.png";
import header from "../images/header.jpg";

import styled from "styled-components";

const Header = styled.div`
  height: 15em;
  padding-top: 1em;
  margin-bottom: 2em;
  background-color: var(--bg-secondary-color);
  background-image: url(${header});
  & .baseline {
    font-family: "Merriweather Sans", sans-serif;
    margin-top: 3.2em;
    text-align: center;
    background-color: #00000099;
  }
`;

const Brand = styled.div`
  background-color: var(--color-secondary);
  display: flex;
  width: 550px;
  align-items: center;
  padding: 0.4em;
  & h1 {
    font-size: 4em;
    margin: 0;
    padding: 0;
    line-height: 75px;
    margin-left: 0em;
    letter-spacing: -4px;
    font-weight: bold;
  }
  & img {
    height: 55px;
    margin-top: 8px;
  }
`;

const GameView = styled.div`
  & .new-game {
    position: absolute;
    top: 1em;
    right: 1em;
  }
`;

const GameList = styled.ul`
  width: 960px;
  list-style: none;
  margin: 0;
  margin: 0 auto;
  padding: 0 2em;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`;

const Game = styled.li`
  width: 100%;
  background-color: var(--bg-secondary-color);
  color: hsl(210, 14%, 75%);
  position: relative;
  min-width: 250px;
  max-width: 440px;
  height: 150px;
  padding: 0.5em;
  margin: 0.3em;
  flex: 1 1 0%;
  width: & .game-name {
    margin: 0 1em;
  }

  & .button {
    margin: 0 2px;
    background-color: var(--color-secondary);
  }

  & .play {
    position: absolute;
    bottom: 0.5em;
    right: 0.5em;
  }

  & .extra-actions {
    position: absolute;
    bottom: 0.5em;
    left: 0.5em;
    display: none;
  }

  &:hover .extra-actions {
    display: block;
  }
`;

const GameListView = () => {
  const { t } = useTranslation();
  const [gameList, setGameList] = React.useState([]);
  const [allowAuth] = React.useState(false);
  const { isAuthenticated, userId } = useAuth();

  React.useEffect(() => {
    getGames().then((content) => {
      setGameList(content);
    });
  }, [isAuthenticated]);

  const handleRemove = (idToRemove) => async () => {
    confirmAlert({
      title: t("Confirmation"),
      message: t("Do you really want to remove selected items ?"),
      buttons: [
        {
          label: t("Yes"),
          onClick: () => {
            deleteGame(idToRemove);
            setGameList(gameList.filter(({ id }) => id !== idToRemove));
          },
        },
        {
          label: t("No"),
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <GameView>
      <Header>
        {isAuthenticated && (
          <Link to={`/game/`} className="button new-game">
            {t("Create new game")}
          </Link>
        )}
        {allowAuth && <Account />}
        <Brand className="brand">
          <a href="/">
            <img src={logo} />
          </a>
          <h1>Air Board Game</h1>
        </Brand>
        <h2 className="baseline">
          Play your favorite games online with your friends
        </h2>
      </Header>
      <GameList>
        {gameList.map(({ name, id, owner }) => (
          <Game key={id}>
            <h2 className="game-name">{name}</h2>
            <Link to={`/game/${id}/session/`} className="button play">
              {t("Play")}
            </Link>
            {userId === owner && (
              <div className="extra-actions">
                <Link to={`/game/${id}/edit`} className="button edit">
                  {t("Edit")}
                </Link>
                <button
                  onClick={handleRemove(id)}
                  className="button error delete"
                >
                  X
                </button>
              </div>
            )}
          </Game>
        ))}
      </GameList>
    </GameView>
  );
};

export default GameListView;
