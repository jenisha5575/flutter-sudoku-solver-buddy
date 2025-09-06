import { cn } from "@/lib/utils";
import { Eraser } from "lucide-react";

interface NumberInputProps {
  selectedCell: { row: number; col: number } | null;
  onNumberSelect: (number: number | null) => void;
  disabled?: boolean;
}

export const NumberInput = ({ selectedCell, onNumberSelect, disabled = false }: NumberInputProps) => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  if (!selectedCell) {
    return (
      <div className="text-center text-muted-foreground py-8">
        <p>Select a cell to enter numbers</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-game-surface to-game-surface-secondary rounded-xl border border-grid-border">
      <h3 className="text-lg font-semibold mb-4 text-foreground">Number Input</h3>
      
      {disabled && (
        <p className="text-center text-muted-foreground py-4 text-sm">
          Solution is being shown
        </p>
      )}
      
      {!disabled && (
        <>
          <p className="text-sm text-muted-foreground mb-4 text-center">
            Selected: Row {selectedCell.row + 1}, Column {selectedCell.col + 1}
          </p>
          
          <div className="grid grid-cols-3 gap-3 mb-4">
            {numbers.map((number) => (
              <button
                key={number}
                onClick={() => onNumberSelect(number)}
                className={cn(
                  "w-12 h-12 rounded-xl font-bold text-lg transition-all duration-200",
                  "bg-number-button hover:bg-number-button-hover text-foreground",
                  "hover:scale-110 active:scale-95 hover:shadow-lg",
                  "border border-grid-border hover:border-primary/50"
                )}
              >
                {number}
              </button>
            ))}
          </div>
          
          <button
            onClick={() => onNumberSelect(null)}
            className={cn(
              "w-full h-12 rounded-xl transition-all duration-200 flex items-center justify-center",
              "bg-destructive hover:bg-destructive/90 text-destructive-foreground",
              "hover:scale-105 active:scale-95 hover:shadow-lg",
              "border border-grid-border hover:border-destructive/50"
            )}
            title="Clear cell"
          >
            <Eraser className="w-4 h-4 mr-2" />
            Clear
          </button>
        </>
      )}
    </div>
  );
};