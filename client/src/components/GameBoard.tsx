import { useState } from 'react';
import { useGame, SCORE_CATEGORIES, CATEGORY_NAMES, ScoreCategory } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Eye } from 'lucide-react';
import ScoreboardTable from './ScoreboardTable';

/**
 * GameBoard Component
 * 
 * Design: Vintage board game aesthetic
 * - Shows current player and 12 score category buttons
 * - Buttons are clickable if score not assigned, show value if assigned
 * - Smooth transitions and hover effects
 * - Scoreboard accessible via button in corner
 */
export default function GameBoard() {
  const { gameState, assignScore, nextPlayer, toggleScoreboard } = useGame();
  const [selectedCategory, setSelectedCategory] = useState<ScoreCategory | null>(null);
  const [scoreValue, setScoreValue] = useState<string>('');

  const currentPlayer = gameState.players[gameState.currentPlayerIndex];
  const currentScores = currentPlayer.scores;

  const handleCategoryClick = (category: ScoreCategory) => {
    if (currentScores[category] === null) {
      setSelectedCategory(category);
      setScoreValue('');
    }
  };

  const handleScoreSubmit = () => {
    if (selectedCategory && scoreValue.trim()) {
      const score = parseInt(scoreValue, 10);
      if (!isNaN(score)) {
        assignScore(gameState.currentPlayerIndex, selectedCategory, score);
        setSelectedCategory(null);
        setScoreValue('');
        
        // Move to next player automatically after each score assignment
        nextPlayer();
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Player Info */}
      <Card className="p-6 bg-gradient-to-r from-primary/20 to-accent/20 border-2 border-primary/30 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Turno di</p>
            <h2 className="text-4xl font-bold text-primary display-font">{currentPlayer.name}</h2>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Categorie completate</p>
            <p className="text-3xl font-bold text-accent">
              {SCORE_CATEGORIES.filter(cat => currentScores[cat] !== null).length}/12
            </p>
          </div>
        </div>
      </Card>

      {/* Score Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {SCORE_CATEGORIES.map(category => {
          const score = currentScores[category];
          const isCompleted = score !== null;

          return (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              disabled={isCompleted}
              className={`p-4 rounded-lg font-bold text-center transition-all transform ${
                isCompleted
                  ? 'bg-muted text-muted-foreground cursor-not-allowed opacity-60'
                  : 'bg-card border-2 border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/60 hover:scale-105 active:scale-95 cursor-pointer shadow-md'
              }`}
            >
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                {category}
              </div>
              <div className="text-2xl font-bold display-font">
                {isCompleted ? score : '-'}
              </div>
              <div className="text-xs mt-1 opacity-75">
                {CATEGORY_NAMES[category]}
              </div>
            </button>
          );
        })}
      </div>

      {/* Scoreboard Toggle Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          onClick={toggleScoreboard}
          className="rounded-full w-14 h-14 p-0 bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-lg transition-all transform hover:scale-110 active:scale-95"
          title="Visualizza tabella punteggi"
        >
          <Eye className="w-6 h-6" />
        </Button>
      </div>

      {/* Score Input Dialog */}
      <Dialog open={selectedCategory !== null} onOpenChange={(open) => !open && setSelectedCategory(null)}>
        <DialogContent className="bg-card border-2 border-primary/30">
          <DialogHeader>
            <DialogTitle className="text-primary display-font">
              Assegna Punteggio: {selectedCategory ? CATEGORY_NAMES[selectedCategory] : ''}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Inserisci il punteggio
              </label>
              <Input
                type="number"
                value={scoreValue}
                onChange={(e) => setScoreValue(e.target.value)}
                placeholder="Es: 25"
                className="bg-input border-2 border-border/50 focus:border-primary"
                autoFocus
              />
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setSelectedCategory(null)}
                className="flex-1 border-2 border-border"
              >
                Annulla
              </Button>
              <Button
                onClick={handleScoreSubmit}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Conferma
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Scoreboard Modal */}
      {gameState.showScoreboard && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="max-w-4xl w-full max-h-96 overflow-auto bg-card border-2 border-primary/30 shadow-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-primary display-font">Tabella Punteggi</h3>
                <Button
                  variant="outline"
                  onClick={toggleScoreboard}
                  className="border-2 border-border"
                >
                  Chiudi
                </Button>
              </div>
              <ScoreboardTable />
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
