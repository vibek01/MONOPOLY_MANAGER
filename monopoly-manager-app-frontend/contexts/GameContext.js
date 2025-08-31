// contexts/GameContext.js
import React, { createContext, useState, useContext } from "react";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [player, setPlayer] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [gameState, setGameState] = useState(null);

  const initializeGame = (playerData, roomIdData) => {
    setPlayer(playerData);
    setRoomId(roomIdData);
  };

  const value = {
    player,
    roomId,
    gameState,
    setGameState,
    initializeGame,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

// Custom hook to easily access the context
export const useGame = () => {
  return useContext(GameContext);
};
