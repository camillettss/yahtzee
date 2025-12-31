import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Trophy, Medal } from 'lucide-react';
import ScoreboardTable from './ScoreboardTable';

/**
 * GameEnd Component
 * 
 * Design: Vintage board game aesthetic
 * - Displays final rankings with trophy and medal icons
 * - Shows complete scoreboard
 * - Option to start a new game
 */
export default function GameEnd() {
  const { getGameRankings, resetGame } = useGame();
  const rankings = getGameRankings();

  const getMedalIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-600" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-orange-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-primary display-font mb-2">
          Partita Terminata!
        </h2>
        <p className="text-lg text-muted-foreground">
          Ecco i risultati finali
        </p>
      </div>

      {/* Rankings */}
      <div className="space-y-3">
        {rankings.map((ranking, index) => (
          <Card
            key={ranking.player.id}
            className={`p-6 border-2 transition-all ${
              index === 0
                ? 'bg-gradient-to-r from-accent/30 to-secondary/30 border-primary/50 shadow-lg scale-105'
                : 'bg-card border-primary/20 hover:border-primary/40'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12">
                  {getMedalIcon(ranking.rank)}
                  {ranking.rank > 3 && (
                    <span className="text-2xl font-bold text-primary display-font">
                      #{ranking.rank}
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    {ranking.rank === 1 ? '🏆 Vincitore' : `Posizione ${ranking.rank}`}
                  </p>
                  <h3 className="text-2xl font-bold text-primary display-font">
                    {ranking.player.name}
                  </h3>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Punteggio Totale
                </p>
                <p className="text-4xl font-bold text-accent display-font">
                  {ranking.totalScore}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Full Scoreboard */}
      <Card className="p-6 bg-card border-2 border-primary/20 shadow-lg">
        <h3 className="text-2xl font-bold text-primary display-font mb-4">
          Tabella Completa
        </h3>
        <ScoreboardTable />
      </Card>

      {/* New Game Button */}
      <div className="flex justify-center">
        <Button
          onClick={resetGame}
          className="px-8 py-6 text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-all transform hover:scale-105 active:scale-95 rounded-lg"
        >
          Nuova Partita
        </Button>
      </div>
    </div>
  );
}
