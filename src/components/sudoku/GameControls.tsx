import { Button } from "@/components/ui/button";
import { RotateCcw, Lightbulb } from "lucide-react";

interface GameControlsProps {
  onNewGame: () => void;
  onSolve: () => void;
  disabled?: boolean;
}

export const GameControls = ({ onNewGame, onSolve, disabled = false }: GameControlsProps) => {
  return (
    <div className="space-y-4">
      <div className="p-6 bg-gradient-to-br from-game-surface to-game-surface-secondary rounded-xl border border-grid-border">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Game Controls</h3>
        
        <div className="space-y-3">
          <Button 
            onClick={onNewGame}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            New Game
          </Button>
          
          <Button 
            onClick={onSolve}
            disabled={disabled}
            variant="outline"
            className="w-full border-muted hover:bg-muted/50 transition-all duration-200"
          >
            <Lightbulb className="w-4 h-4 mr-2" />
            Show Solution
          </Button>
        </div>
      </div>
    </div>
  );
};