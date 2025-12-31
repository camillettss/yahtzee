import { useGame, SCORE_CATEGORIES, CATEGORY_NAMES } from '@/contexts/GameContext';

/**
 * ScoreboardTable Component
 * 
 * Design: Vintage board game aesthetic
 * - Displays a table with one column per player and one row per score category
 * - Shows total scores at the bottom
 * - Clean, readable layout with forest green and cream colors
 */
export default function ScoreboardTable() {
  const { gameState } = useGame();

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-primary/20 border-b-2 border-primary/30">
            <th className="p-3 text-left font-bold text-primary display-font border-r border-primary/20">
              Categoria
            </th>
            {gameState.players.map(player => (
              <th
                key={player.id}
                className="p-3 text-center font-bold text-primary display-font border-r border-primary/20 min-w-24"
              >
                {player.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {SCORE_CATEGORIES.map((category, index) => (
            <tr
              key={category}
              className={`border-b border-border/50 ${
                index % 2 === 0 ? 'bg-background' : 'bg-muted/30'
              } hover:bg-accent/10 transition-colors`}
            >
              <td className="p-3 font-semibold text-foreground border-r border-primary/20">
                <div className="text-sm uppercase tracking-wider text-muted-foreground">
                  {category}
                </div>
                <div className="text-xs text-foreground/75">
                  {CATEGORY_NAMES[category]}
                </div>
              </td>
              {gameState.players.map(player => {
                const score = player.scores[category];
                return (
                  <td
                    key={`${player.id}-${category}`}
                    className="p-3 text-center font-bold border-r border-primary/20"
                  >
                    {score !== null ? (
                      <span className="text-lg text-primary display-font">{score}</span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
          {/* Total Row */}
          <tr className="bg-primary/20 border-t-2 border-primary/30 font-bold">
            <td className="p-3 font-bold text-primary display-font border-r border-primary/20">
              TOTALE
            </td>
            {gameState.players.map(player => {
              const total = Object.values(player.scores).reduce(
                (sum: number, score) => sum + (score ?? 0),
                0
              );
              return (
                <td
                  key={`${player.id}-total`}
                  className="p-3 text-center font-bold text-primary display-font border-r border-primary/20 text-lg"
                >
                  {total}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
