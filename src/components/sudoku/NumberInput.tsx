import { cn } from "@/lib/utils";
import { Eraser } from "lucide-react";

interface NumberInputProps {
  selectedCell: { row: number; col: number } | null;
  onNumberSelect: (number: number | null) => void;
}

export const NumberInput = ({ selectedCell, onNumberSelect }: NumberInputProps) => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  if (!selectedCell) {
    return (
      <div className="text-center text-muted-foreground py-8">
        <p>Select a cell to enter numbers</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm text-muted-foreground">
        Selected: Row {selectedCell.row + 1}, Column {selectedCell.col + 1}
      </p>
      
      <div className="grid grid-cols-5 gap-3">
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
        
        <button
          onClick={() => onNumberSelect(null)}
          className={cn(
            "w-12 h-12 rounded-xl transition-all duration-200 flex items-center justify-center",
            "bg-destructive hover:bg-destructive/90 text-destructive-foreground",
            "hover:scale-110 active:scale-95 hover:shadow-lg",
            "border border-grid-border hover:border-destructive/50"
          )}
          title="Clear cell"
        >
          <Eraser className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};