import { useState } from 'react';
import { useGame } from '@/contexts/GameContext';
import GameSetup from '@/components/GameSetup';
import GameBoard from '@/components/GameBoard';
import GameEnd from '@/components/GameEnd';

/**
 * Home Page - Yahtzee Game App
 * 
 * Design Philosophy: Retro Dice Game Aesthetic
 * - Warm cream background (#F5E6D3) with vintage board game feel
 * - Forest green (#2D5016) primary actions
 * - Burnt orange (#D97706) and mustard yellow (#F59E0B) accents
 * - Serif typography (Playfair Display) for titles, sans-serif (Poppins) for body
 * - Tactile, nostalgic interactions with smooth transitions
 */
export default function Home() {
  const { gameState, resetGame } = useGame();

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: 'url(/images/game-background.png)',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
      }}
    >
      {/* Header */}
      <header className="bg-primary/5 shadow-md backdrop-blur-md border-b-2 border-primary/20 py-4 px-4">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="/images/dice-hero.png" 
                alt="Yahtzee" 
                className="w-12 h-12 object-cover rounded"
              />
              <h1 className="text-4xl font-bold text-primary display-font">Yahtzee</h1>
            </div>
            {gameState.gameStarted && (
              <button
                onClick={resetGame}
                className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors font-semibold"
              >
                Nuova Partita
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container py-8 px-4">
        {!gameState.gameStarted ? (
          <GameSetup />
        ) : gameState.gameEnded ? (
          <GameEnd />
        ) : (
          <GameBoard />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-primary/10 backdrop-blur-sm border-t-2 border-primary/20 py-4 px-4 text-center text-muted-foreground">
        <p>Franceschino © 2025 - Yahtzee!</p>
      </footer>
    </div>
  );
}
