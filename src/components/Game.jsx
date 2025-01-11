import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Game = () => {
  const location = useLocation();
  const { numberOfPlayers, nameOfPlayers } = location.state || { numberOfPlayers: 0, nameOfPlayers: [] };

  // Suivi du joueur actuel
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(null);
  const [startMessage, setStartMessage] = useState(''); // Message de début de tour
  const [gameStarted, setGameStarted] = useState(false); // Vérifie si le jeu a commencé
  const [dice, setDice] = useState([]); // État pour les dés
  const [points, setPoints] = useState(0); // État pour les points

  // Fonction pour tirer un joueur au sort
  const pickRandomPlayer = () => {
    const randomPlayerIndex = Math.floor(Math.random() * numberOfPlayers);
    setCurrentPlayerIndex(randomPlayerIndex);
  };

  // Effectuer le tirage au sort une seule fois à l'arrivée sur la page
  useEffect(() => {
    if (numberOfPlayers > 0 && !gameStarted) {
      pickRandomPlayer(); // Tirage au sort
      setGameStarted(true); // Indique que le jeu a commencé
    }
  }, [numberOfPlayers, gameStarted]); // Effectuer une seule fois au chargement

  // Afficher le message de début après le tirage, et le faire disparaître après 3 secondes
  useEffect(() => {
    if (currentPlayerIndex !== null && gameStarted) {
      const playerName = nameOfPlayers[currentPlayerIndex];
      setStartMessage(`${playerName} commence`);

      const timer = setTimeout(() => {
        setStartMessage(''); // Effacer le message après 3 secondes
      }, 3000); // 3 secondes avant de supprimer le message

      // Nettoyage du timer pour éviter les fuites de mémoire
      return () => clearTimeout(timer);
    }
  }, [gameStarted]);

  // Fonction pour lancer les dés et calculer les points
  const rollDice = () => {
    const newDice = Array(6).fill(0).map(() => Math.floor(Math.random() * 6) + 1);
    setDice(newDice);

    // Calcul des points
    const totalPoints = newDice.reduce((total, die) => {
      if (die === 1) return total + 100; // Si le dé vaut 1, on ajoute 100 points
      if (die === 5) return total + 50;  // Si le dé vaut 5, on ajoute 50 points
      return total;
    }, 0);

    setPoints(totalPoints); // Met à jour le score
  };

  // Fonction pour passer au joueur suivant
  const nextPlayer = () => {
    const nextIndex = (currentPlayerIndex + 1) % numberOfPlayers;
    setCurrentPlayerIndex(nextIndex);
    setDice([]); // Réinitialiser les dés
    setPoints(0); // Réinitialiser les points
  };

  return (
    <div>
      <h2>Partie de 10 000</h2>
      <p>Nombre de joueurs : {numberOfPlayers}</p>
      <p>Joueurs : {nameOfPlayers.join(', ')}</p>

      {/* Afficher le message de début de tour uniquement au premier tirage */}
      {startMessage && <p>{startMessage}</p>}

      {/* Afficher le message "C'est au tour de..." */}
      {currentPlayerIndex !== null && currentPlayerIndex !== undefined && (
        <p>C'est au tour de {nameOfPlayers[currentPlayerIndex]}</p>
      )}

      {/* Lancer les dés */}
      <button onClick={rollDice}>Lancer les dés</button>

      {/* Affichage des dés */}
      {dice.length > 0 && (
        <div>
          <h3>Dés :</h3>
          <ul>
            {dice.map((die, index) => (
              <li key={index}>{die}</li>
            ))}
          </ul>
          <p>Points pour ce lancer : {points}</p>
        </div>
      )}

      {/* Passer au joueur suivant */}
      {currentPlayerIndex !== null && (
        <button onClick={nextPlayer}>Fin de tour</button>
      )}
    </div>
  );
};

export default Game;
