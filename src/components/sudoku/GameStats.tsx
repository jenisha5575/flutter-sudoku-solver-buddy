import { Clock, Trophy } from "lucide-react";

interface GameStatsProps {
  elapsedTime: number;
  isComplete: boolean;
}

export const GameStats = ({ elapsedTime, isComplete }: GameStatsProps) => {
  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="p-6 bg-gradient-to-br from-game-surface to-game-surface-secondary rounded-xl border border-grid-border">
      <h3 className="text-lg font-semibold mb-4 text-foreground">Game Stats</h3>
      
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Time</p>
            <p className="text-xl font-mono font-bold text-foreground">
              {formatTime(elapsedTime)}
            </p>
          </div>
        </div>
        
        {isComplete && (
          <div className="flex items-center gap-3 p-3 bg-cell-success/20 rounded-lg border border-cell-success/30">
            <Trophy className="w-5 h-5 text-cell-success" />
            <div>
              <p className="text-sm font-medium text-cell-success">Puzzle Complete!</p>
              <p className="text-xs text-muted-foreground">
                Completed in {formatTime(elapsedTime)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};