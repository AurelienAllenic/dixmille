import React from 'react';
import { useLocation } from 'react-router-dom';

const Game = () => {
  const location = useLocation();
  const { numberOfPlayers, nameOfPlayers } = location.state || { numberOfPlayers: 0, nameOfPlayers: [] };

  return (
    <div>
      <h2>Partie de 10 000</h2>
      <p>Nombre de joueurs : {numberOfPlayers}</p>
      <p>Joueurs : {nameOfPlayers.join(', ')}</p>
    </div>
  );
};

export default Game;
