import React, { createContext, useContext, useReducer } from 'react';

// Limite maximale de joueurs
const MAX_PLAYERS = 15;

// État initial du jeu
const initialState = {
  players: [], // Liste des joueurs, ex : [{ id: 1, name: 'Player 1', score: 0, bars: 0, entered: false }]
  activePlayer: null, // ID du joueur actif
  dice: [1, 2, 3, 4, 5, 6], // Dés actuels
  temporaryScore: 0, // Score temporaire pour le tour en cours
  gameStarted: false, // Indique si la partie a commencé
};

// Types d'actions pour le reducer
const ACTIONS = {
  ADD_PLAYER: 'ADD_PLAYER',
  REMOVE_PLAYER: 'REMOVE_PLAYER',
  START_GAME: 'START_GAME',
  UPDATE_SCORE: 'UPDATE_SCORE',
  NEXT_PLAYER: 'NEXT_PLAYER',
  RESET_GAME: 'RESET_GAME',
};

// Reducer pour gérer les actions du jeu
const gameReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_PLAYER:
      if (state.players.length >= MAX_PLAYERS) return state;
      return {
        ...state,
        players: [...state.players, action.payload],
      };

    case ACTIONS.REMOVE_PLAYER:
      return {
        ...state,
        players: state.players.filter((player) => player.id !== action.payload),
      };

    case ACTIONS.START_GAME:
      return {
        ...state,
        gameStarted: true,
        activePlayer: state.players.length > 0 ? state.players[0].id : null,
      };

    case ACTIONS.UPDATE_SCORE:
      return {
        ...state,
        players: state.players.map((player) =>
          player.id === action.payload.id
            ? { ...player, score: player.score + action.payload.score }
            : player
        ),
      };

    case ACTIONS.NEXT_PLAYER:
      const currentIndex = state.players.findIndex((p) => p.id === state.activePlayer);
      const nextIndex = (currentIndex + 1) % state.players.length;
      return {
        ...state,
        activePlayer: state.players[nextIndex].id,
      };

    case ACTIONS.RESET_GAME:
      return initialState;

    default:
      return state;
  }
};

// Contexte de jeu
const GameContext = createContext();

// Fournisseur du contexte
export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch, ACTIONS }}>
      {children}
    </GameContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useGameContext = () => useContext(GameContext);
