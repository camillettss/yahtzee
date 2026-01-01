import { useState } from 'react';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';

/**
 * GameSetup Component
 * 
 * Design: Vintage board game aesthetic
 * - Warm cream cards with forest green accents
 * - Smooth transitions and hover effects
 * - Clear visual hierarchy for player inputs
 */
export default function GameSetup() {
  const { initializeGame } = useGame();
  const [playerNames, setPlayerNames] = useState<string[]>(['', '', '', '']);
  const [error, setError] = useState<string>('');

  const handlePlayerNameChange = (index: number, value: string) => {
    const newNames = [...playerNames];
    newNames[index] = value;
    setPlayerNames(newNames);
    setError('');
  };

  const handleAddPlayer = () => {
    if (playerNames.length < 20) {
      setPlayerNames([...playerNames, '']);
    }
  };

  const handleRemovePlayer = (index: number) => {
    if (playerNames.length > 2) {
      setPlayerNames(playerNames.filter((_, i) => i !== index));
    }
  };

  const handleStartGame = () => {
    // Validate player names
    const validNames = playerNames.filter(name => name.trim() !== '');
    
    if (validNames.length < 2) {
      setError('Inserisci almeno 2 nomi di giocatori');
      return;
    }

    if (validNames.length !== new Set(validNames).size) {
      setError('I nomi dei giocatori devono essere unici');
      return;
    }

    initializeGame(validNames);
  };

  return (
    <div className="max-w-2xl mx-auto shadow-lg">
      <Card className="p-8 bg-card/95 backdrop-blur-sm border-2 border-primary/20 shadow-lg">
        <div className="space-y-6">
          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-primary display-font mb-2">
              Configura la Partita
            </h2>
            <p className="text-muted-foreground">
              Inserisci i nomi dei giocatori e inizia a giocare
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-destructive/10 border border-destructive rounded-lg text-destructive font-semibold">
              {error}
            </div>
          )}

          {/* Player Names Input */}
          <div className="space-y-4">
            <label className="block text-lg font-semibold text-foreground display-font">
              Giocatori ({playerNames.filter(n => n.trim()).length})
            </label>
            
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {playerNames.map((name, index) => (
                <div key={index} className="flex gap-3 items-center">
                  <div className="flex-1">
                    <Input
                      type="text"
                      placeholder={`Giocatore ${index + 1}`}
                      value={name}
                      onChange={(e) => handlePlayerNameChange(index, e.target.value)}
                      className="bg-input border-2 border-border/50 focus:border-primary transition-colors"
                    />
                  </div>
                  {playerNames.length > 2 && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleRemovePlayer(index)}
                      className="border-2 border-destructive/50 text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {/* Add Player Button */}
            {playerNames.length < 20 && (
              <Button
                variant="outline"
                onClick={handleAddPlayer}
                className="w-full border-2 border-dashed border-primary/50 text-primary hover:bg-primary/5 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Aggiungi Giocatore
              </Button>
            )}
          </div>

          {/* Start Button */}
          <Button
            onClick={handleStartGame}
            className="w-full py-6 text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-all transform hover:scale-105 active:scale-95 rounded-lg"
          >
            Inizia Partita
          </Button>

          {/* Info */}
          <div className="p-4 bg-accent/10 border border-accent/30 rounded-lg text-sm text-foreground">
            <p className="font-semibold mb-2 display-font">Come Giocare:</p>
            <ul className="space-y-1 text-xs">
              <li>• Ogni giocatore deve assegnare un punteggio a 12 categorie</li>
              <li>• I turni si alternano tra i giocatori</li>
              <li>• Visualizza la tabella dei punteggi in qualsiasi momento</li>
              <li>• La partita termina quando tutti hanno completato le 12 categorie</li>
              <li>• Se non funziona insultatemi </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
