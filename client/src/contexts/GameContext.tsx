import React, { createContext, useContext, useState, useCallback } from 'react';

export type ScoreCategory = 'UNO' | 'DUE' | 'TRE' | 'QUA' | 'CIN' | 'SEI' | 'FUL' | 'POK' | 'YAH' | 'SCA' | 'SCP' | 'LIB';

export const SCORE_CATEGORIES: ScoreCategory[] = ['UNO', 'DUE', 'TRE', 'QUA', 'CIN', 'SEI', 'FUL', 'POK', 'YAH', 'SCA', 'SCP', 'LIB'];

export const CATEGORY_NAMES: Record<ScoreCategory, string> = {
  'UNO': 'Uno',
  'DUE': 'Due',
  'TRE': 'Tre',
  'QUA': 'Quattro',
  'CIN': 'Cinque',
  'SEI': 'Sei',
  'FUL': 'Full',
  'POK': 'Poker',
  'YAH': 'Yahtzee',
  'SCA': 'Scala Grande',
  'SCP': 'Scala Piccola',
  'LIB': 'Tiro Libero'
};

export interface Player {
  id: string;
  name: string;
  scores: Record<ScoreCategory, number | null>;
}

export interface GameState {
  players: Player[];
  currentPlayerIndex: number;
  gameStarted: boolean;
  gameEnded: boolean;
  showScoreboard: boolean;
}

interface GameContextType {
  gameState: GameState;
  initializeGame: (playerNames: string[]) => void;
  assignScore: (playerIndex: number, category: ScoreCategory, score: number) => void;
  nextPlayer: () => void;
  toggleScoreboard: () => void;
  resetGame: () => void;
  getGameRankings: () => Array<{ player: Player; totalScore: number; rank: number }>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>({
    players: [],
    currentPlayerIndex: 0,
    gameStarted: false,
    gameEnded: false,
    showScoreboard: false,
  });

  const initializeGame = useCallback((playerNames: string[]) => {
    const players: Player[] = playerNames.map((name, index) => ({
      id: `player-${index}`,
      name,
      scores: SCORE_CATEGORIES.reduce((acc, cat) => ({ ...acc, [cat]: null }), {} as Record<ScoreCategory, number | null>),
    }));

    setGameState({
      players,
      currentPlayerIndex: 0,
      gameStarted: true,
      gameEnded: false,
      showScoreboard: false,
    });
  }, []);

  const assignScore = useCallback((playerIndex: number, category: ScoreCategory, score: number) => {
    setGameState(prev => {
      const newPlayers = [...prev.players];
      newPlayers[playerIndex] = {
        ...newPlayers[playerIndex],
        scores: {
          ...newPlayers[playerIndex].scores,
          [category]: score,
        },
      };

      // Check if game is complete (all players have all scores)
      const gameComplete = newPlayers.every(player =>
        SCORE_CATEGORIES.every(cat => player.scores[cat] !== null)
      );

      return {
        ...prev,
        players: newPlayers,
        gameEnded: gameComplete,
      };
    });
  }, []);

  const nextPlayer = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      currentPlayerIndex: (prev.currentPlayerIndex + 1) % prev.players.length,
    }));
  }, []);

  const toggleScoreboard = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      showScoreboard: !prev.showScoreboard,
    }));
  }, []);

  const resetGame = useCallback(() => {
    setGameState({
      players: [],
      currentPlayerIndex: 0,
      gameStarted: false,
      gameEnded: false,
      showScoreboard: false,
    });
  }, []);

  const getGameRankings = useCallback((): Array<{ player: Player; totalScore: number; rank: number }> => {
    const rankings = gameState.players
      .map(player => {
        const totalScore: number = Object.values(player.scores).reduce((sum: number, score) => sum + (score ?? 0), 0);
        return { player, totalScore };
      })
      .sort((a, b) => b.totalScore - a.totalScore)
      .map((item, index) => ({ player: item.player, totalScore: item.totalScore, rank: index + 1 }));

    return rankings;
  }, [gameState.players]);

  return (
    <GameContext.Provider
      value={{
        gameState,
        initializeGame,
        assignScore,
        nextPlayer,
        toggleScoreboard,
        resetGame,
        getGameRankings,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
};
