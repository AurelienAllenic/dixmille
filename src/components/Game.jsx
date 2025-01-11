import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Game = () => {
  const location = useLocation();
  const { numberOfPlayers, nameOfPlayers } = location.state || { numberOfPlayers: 0, nameOfPlayers: [] };

  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(null);
  const [diceResults, setDiceResults] = useState([]); // Résultats des lancers de chaque joueur
  const [isChoosingStarter, setIsChoosingStarter] = useState(true); // Phase de détermination du premier joueur
  const [currentTurnIndex, setCurrentTurnIndex] = useState(0); // Suivi du joueur pendant la phase de lancer unique
  const [startMessage, setStartMessage] = useState(''); // Message du joueur qui commence

  const [dice, setDice] = useState([]); // Résultats des dés pour le tour actuel
  const [points, setPoints] = useState(0); // Points du tour actuel

  // Fonction pour lancer un dé pour un joueur pendant la phase de choix du starter
  const rollStarterDice = () => {
    const roll = Math.floor(Math.random() * 6) + 1; // Résultat du lancer (1 à 6)
    setDiceResults((prevResults) => {
      const newResults = [...prevResults];
      newResults[currentTurnIndex] = roll;
      return newResults;
    });

    if (currentTurnIndex + 1 >= numberOfPlayers) {
      // Dernier joueur a lancé, attendre pour montrer son résultat
      setTimeout(() => {
        determineStarter();
      }, 2000); // 2 secondes pour afficher le dernier résultat
    } else {
      // Passer au joueur suivant
      setCurrentTurnIndex((prevIndex) => prevIndex + 1);
    }
  };

  // Déterminer le joueur qui commence après tous les lancers
  const determineStarter = () => {
    const maxRoll = Math.max(...diceResults);
    const starterIndex = diceResults.indexOf(maxRoll);
    setCurrentPlayerIndex(starterIndex);
    setIsChoosingStarter(false);

    // Afficher le message pour le joueur qui commence
    setStartMessage(`${nameOfPlayers[starterIndex]} commence !`);
    setTimeout(() => {
      setStartMessage(''); // Supprimer le message après 3 secondes
    }, 3000);
  };

  // Fonction pour lancer les dés dans le jeu principal
  const rollDice = () => {
    const newDice = Array(6).fill(0).map(() => Math.floor(Math.random() * 6) + 1);
    setDice(newDice);

    // Calcul des points pour les 1 et les 5
    const totalPoints = newDice.reduce((total, die) => {
      if (die === 1) return total + 100; // 1 vaut 100 points
      if (die === 5) return total + 50;  // 5 vaut 50 points
      return total;
    }, 0);

    setPoints(totalPoints);
  };

  // Fonction pour passer au joueur suivant
  const nextPlayer = () => {
    setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % numberOfPlayers);
    setDice([]); // Réinitialiser les dés
    setPoints(0); // Réinitialiser les points
  };

  return (
    <div>
      <h2>Partie de 10 000</h2>
      <p>Nombre de joueurs : {numberOfPlayers}</p>
      <p>Joueurs : {nameOfPlayers.join(', ')}</p>

      {isChoosingStarter ? (
        <div>
          <h3>Déterminons qui commence !</h3>
          <p>{nameOfPlayers[currentTurnIndex]} lance le dé.</p>
          <button onClick={rollStarterDice}>Lancer le dé</button>
          <ul>
            {diceResults.map((result, index) => (
              <li key={index}>
                {nameOfPlayers[index]} : {result || 'Pas encore lancé'}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h3>Le jeu commence !</h3>
          {startMessage && <p>{startMessage}</p>}
          <p>C'est au tour de {nameOfPlayers[currentPlayerIndex]}</p>
          
          {/* Lancer les dés */}
          <button onClick={rollDice}>Lancer les dés</button>

          {/* Affichage des dés et des points */}
          {dice.length > 0 && (
            <div>
              <h3>Résultat des dés :</h3>
              <ul>
                {dice.map((die, index) => (
                  <li key={index}>{die}</li>
                ))}
              </ul>
              <p>Points pour ce tour : {points}</p>
            </div>
          )}

          {/* Passer au joueur suivant */}
          <button onClick={nextPlayer}>Fin de tour</button>
        </div>
      )}
    </div>
  );
};

export default Game;
