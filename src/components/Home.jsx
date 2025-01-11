import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameProvider, useGameContext } from '../context/GameContext';


const GameSetup = () => {
  const { state, dispatch, ACTIONS } = useGameContext();
  const [playerName, setPlayerName] = useState('');
  const navigate = useNavigate();

  const addPlayer = () => {
    if (!playerName.trim()) {
      alert("Le nom du joueur ne peut pas être vide !");
      return;
    }
  
    const isDuplicate = state.players.some(player => player.name.toLowerCase() === playerName.toLowerCase());
    if (isDuplicate) {
      alert("Un joueur avec ce nom existe déjà !");
      return;
    }
  
    if (state.players.length < 15) {
      dispatch({
        type: ACTIONS.ADD_PLAYER,
        payload: { id: Date.now(), name: playerName, score: 0, bars: 0, entered: false },
      });
      setPlayerName('');
    } else {
      alert("Vous avez atteint le maximum de 15 joueurs !");
    }
  };
  

  const removePlayer = (id) => {
    dispatch({ type: ACTIONS.REMOVE_PLAYER, payload: id });
  };

  const startGame = () => {
    if (state.players.length < 2) {
      alert("Il faut au moins deux joueurs pour démarrer une partie !");
      return;
    }
  
    navigate('/game', { 
      state: { 
        numberOfPlayers: state.players.length, 
        nameOfPlayers: state.players.map(player => player.name) 
      } 
    });
  
    dispatch({ type: ACTIONS.START_GAME });
  };
  

  return (
    <div>
      <h2>Paramétrer la partie</h2>
      
      {/* Ajout de joueurs */}
      <div>
        <input
          type="text"
          value={playerName}
          placeholder="Nom du joueur"
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <button onClick={addPlayer} disabled={state.players.length >= 15}>
          Ajouter un joueur
        </button>
      </div>

      {/* Liste des joueurs */}
      <ul>
        {state.players.map((player) => (
          <li key={player.id}>
            {player.name} 
            <button onClick={() => removePlayer(player.id)}>Supprimer</button>
          </li>
        ))}
      </ul>

      <p>Nombre de joueurs : {state.players.length}</p>
      <p>Maximum autorisé : 15 joueurs</p>

      {/* Bouton pour démarrer la partie */}
      <button onClick={startGame} disabled={state.gameStarted}>
        {state.gameStarted ? "Partie en cours..." : "Démarrer la partie"}
      </button>
    </div>
  );
};

const Home = () => {
  return (
    <GameProvider>
      <div className="App">
        <h1>Jeu du 10 000</h1>
        <GameSetup />
      </div>
    </GameProvider>
  );
};

export default Home;
