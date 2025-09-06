import { CellValue } from "./SudokuGame";
import { cn } from "@/lib/utils";

interface SudokuGridProps {
  board: CellValue[][];
  initialBoard: CellValue[][];
  selectedCell: { row: number; col: number } | null;
  errors: Set<string>;
  onCellClick: (row: number, col: number) => void;
  isComplete: boolean;
}

export const SudokuGrid = ({
  board,
  initialBoard,
  selectedCell,
  errors,
  onCellClick,
  isComplete,
}: SudokuGridProps) => {
  const getCellStyle = (row: number, col: number) => {
    const isSelected = selectedCell?.row === row && selectedCell?.col === col;
    const isHighlighted = selectedCell && (
      selectedCell.row === row || 
      selectedCell.col === col ||
      (Math.floor(selectedCell.row / 3) === Math.floor(row / 3) && 
       Math.floor(selectedCell.col / 3) === Math.floor(col / 3))
    );
    const isInitial = initialBoard[row][col] !== null;
    const hasError = errors.has(`${row}-${col}`);
    const isEmpty = board[row][col] === null;

    return cn(
      "w-12 h-12 flex items-center justify-center text-lg font-semibold transition-all duration-200 cursor-pointer border",
      "hover:scale-105 active:scale-95",
      
      // Border styles for 3x3 sections
      {
        "border-r-2 border-r-grid-thick-border": col === 2 || col === 5,
        "border-b-2 border-b-grid-thick-border": row === 2 || row === 5,
        "border-grid-border": true,
      },
      
      // Cell state styles
      {
        "bg-cell-empty": isEmpty,
        "bg-cell-filled": !isEmpty && !isSelected,
        "bg-cell-selected text-primary-foreground": isSelected,
        "bg-cell-highlighted": isHighlighted && !isSelected,
        "bg-cell-error text-destructive-foreground": hasError,
        "text-muted-foreground": isInitial,
        "text-foreground": !isInitial && !hasError,
        "cursor-not-allowed opacity-60": isInitial,
        "shadow-lg ring-2 ring-primary": isSelected,
      },
      
      // Complete state
      {
        "bg-cell-success": isComplete && !isEmpty,
      }
    );
  };

  return (
    <div className="inline-block p-6 bg-gradient-to-br from-game-surface to-game-surface-secondary rounded-2xl shadow-2xl border border-grid-border">
      <div className="grid grid-cols-9 gap-0 bg-grid-thick-border p-1 rounded-lg">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <button
              key={`${rowIndex}-${colIndex}`}
              className={getCellStyle(rowIndex, colIndex)}
              onClick={() => onCellClick(rowIndex, colIndex)}
              disabled={initialBoard[rowIndex][colIndex] !== null}
            >
              {cell || ""}
            </button>
          ))
        )}
      </div>
    </div>
  );
};