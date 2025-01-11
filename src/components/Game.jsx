import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Game = () => {
  const location = useLocation();
  const { numberOfPlayers, nameOfPlayers } = location.state || { numberOfPlayers: 0, nameOfPlayers: [] };

  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(null);
  const [diceResults, setDiceResults] = useState([]);
  const [isChoosingStarter, setIsChoosingStarter] = useState(true);
  const [currentTurnIndex, setCurrentTurnIndex] = useState(0);
  const [startMessage, setStartMessage] = useState('');

  const [dice, setDice] = useState([]);
  const [points, setPoints] = useState(0);

  const rollStarterDice = () => {
    const roll = Math.floor(Math.random() * 6) + 1;
    setDiceResults((prevResults) => {
      const newResults = [...prevResults];
      newResults[currentTurnIndex] = roll;
      return newResults;
    });

    if (currentTurnIndex + 1 >= numberOfPlayers) {
      setTimeout(() => {
        determineStarter();
      }, 2000);
    } else {
      setCurrentTurnIndex((prevIndex) => prevIndex + 1);
    }
  };

  const determineStarter = () => {
    const maxRoll = Math.max(...diceResults);
    const starterIndex = diceResults.indexOf(maxRoll);
    setCurrentPlayerIndex(starterIndex);
    setIsChoosingStarter(false);

    setStartMessage(`${nameOfPlayers[starterIndex]} commence !`);
    setTimeout(() => {
      setStartMessage('');
    }, 3000);
  };

  const rollDice = () => {
    const newDice = Array(6)
      .fill(0)
      .map(() => Math.floor(Math.random() * 6) + 1);
    setDice(newDice);

    calculatePoints(newDice);
  };

  const generateSpecificCombination = (count, dieValue) => {
    const newDice = Array(count).fill(dieValue).concat(Array(6 - count).fill(0).map(() => Math.floor(Math.random() * 6) + 1));
    setDice(newDice);
    calculatePoints(newDice);
  };

  const generateStraight = () => {
    const newDice = [1, 2, 3, 4, 5, 6];
    setDice(newDice);
    calculatePoints(newDice);
  };

  const calculatePoints = (newDice) => {
    // Vérifie la suite (1, 2, 3, 4, 5, 6)
    const isStraight = [1, 2, 3, 4, 5, 6].every((value) => newDice.includes(value));
    if (isStraight) {
      setPoints(1000);
      return;
    }

    const counts = newDice.reduce((acc, die) => {
      acc[die] = (acc[die] || 0) + 1;
      return acc;
    }, {});

    let totalPoints = 0;

    Object.entries(counts).forEach(([die, count]) => {
      const dieValue = parseInt(die, 10);
      let basePoints = 0;

      if (dieValue === 1) {
        basePoints = 700; // Triple 1 vaut 700 points
      } else {
        basePoints = dieValue * 100; // Triple n vaut n * 100 points
      }

      if (count >= 6) {
        totalPoints += basePoints * 2 * 2 * 2; // Sixtuple
        count -= 6;
      } else if (count >= 5) {
        totalPoints += basePoints * 2 * 2; // Quintuple
        count -= 5;
      } else if (count >= 4) {
        totalPoints += basePoints * 2; // Quadruple
        count -= 4;
      } else if (count >= 3) {
        totalPoints += basePoints; // Triple
        count -= 3;
      }

      // Points pour les 1 restants
      if (dieValue === 1) {
        totalPoints += count * 100;
      }

      // Points pour les 5 restants
      if (dieValue === 5) {
        totalPoints += count * 50;
      }
    });

    setPoints(totalPoints);
  };

  const nextPlayer = () => {
    setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % numberOfPlayers);
    setDice([]);
    setPoints(0);
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
          
          <button onClick={rollDice}>Lancer les dés</button>

          <div>
            <h3>Tester des combinaisons spécifiques :</h3>
          </div>

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

          <button onClick={nextPlayer}>Fin de tour</button>
        </div>
      )}
    </div>
  );
};

export default Game;
