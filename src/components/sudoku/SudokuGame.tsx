import { useState, useEffect, useCallback } from "react";
import { SudokuGrid } from "./SudokuGrid";
import { NumberInput } from "./NumberInput";
import { GameControls } from "./GameControls";
import { GameStats } from "./GameStats";
import { generateSudoku, solveSudoku, isValidMove } from "@/lib/sudokuUtils";
import { useToast } from "@/hooks/use-toast";

export type CellValue = number | null;
export type SudokuBoard = CellValue[][];

export interface GameState {
  board: SudokuBoard;
  solution: SudokuBoard;
  initialBoard: SudokuBoard;
  selectedCell: { row: number; col: number } | null;
  isComplete: boolean;
  errors: Set<string>;
  startTime: number;
  elapsedTime: number;
}

export const SudokuGame = () => {
  const { toast } = useToast();
  const [gameState, setGameState] = useState<GameState>(() => {
    const { puzzle, solution } = generateSudoku();
    return {
      board: puzzle,
      solution,
      initialBoard: puzzle.map(row => [...row]),
      selectedCell: null,
      isComplete: false,
      errors: new Set(),
      startTime: Date.now(),
      elapsedTime: 0,
    };
  });

  // Timer effect
  useEffect(() => {
    if (gameState.isComplete) return;

    const interval = setInterval(() => {
      setGameState(prev => ({
        ...prev,
        elapsedTime: Date.now() - prev.startTime,
      }));
    }, 100);

    return () => clearInterval(interval);
  }, [gameState.isComplete]);

  const handleCellClick = useCallback((row: number, col: number) => {
    // Don't allow selecting pre-filled cells
    if (gameState.initialBoard[row][col] !== null) return;

    setGameState(prev => ({
      ...prev,
      selectedCell: prev.selectedCell?.row === row && prev.selectedCell?.col === col 
        ? null 
        : { row, col },
    }));
  }, [gameState.initialBoard]);

  const handleNumberInput = useCallback((number: number | null) => {
    const { selectedCell, board, solution } = gameState;
    if (!selectedCell) return;

    const { row, col } = selectedCell;
    const newBoard = board.map(r => [...r]);
    newBoard[row][col] = number;

    // Check if move is valid
    const errorKey = `${row}-${col}`;
    const newErrors = new Set(gameState.errors);
    
    if (number !== null && !isValidMove(newBoard, row, col, number)) {
      newErrors.add(errorKey);
    } else {
      newErrors.delete(errorKey);
    }

    // Check if puzzle is complete
    const isComplete = newBoard.every((row, i) => 
      row.every((cell, j) => cell === solution[i][j])
    );

    setGameState(prev => ({
      ...prev,
      board: newBoard,
      errors: newErrors,
      isComplete,
    }));

    if (isComplete) {
      toast({
        title: "Congratulations! 🎉",
        description: `You solved the puzzle in ${Math.floor(gameState.elapsedTime / 1000)}s!`,
      });
    }
  }, [gameState, toast]);

  const newGame = useCallback(() => {
    const { puzzle, solution } = generateSudoku();
    setGameState({
      board: puzzle,
      solution,
      initialBoard: puzzle.map(row => [...row]),
      selectedCell: null,
      isComplete: false,
      errors: new Set(),
      startTime: Date.now(),
      elapsedTime: 0,
    });
  }, []);

  const solvePuzzle = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      board: prev.solution.map(row => [...row]),
      isComplete: true,
      errors: new Set(),
    }));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/90 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent mb-2">
            Sudoku
          </h1>
          <p className="text-muted-foreground">
            Fill the 9×9 grid so each row, column, and 3×3 box contains digits 1-9
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_300px] gap-8 items-start">
          {/* Game Board */}
          <div className="flex flex-col items-center gap-6">
            <SudokuGrid
              board={gameState.board}
              initialBoard={gameState.initialBoard}
              selectedCell={gameState.selectedCell}
              errors={gameState.errors}
              onCellClick={handleCellClick}
              isComplete={gameState.isComplete}
            />
            
            <NumberInput
              selectedCell={gameState.selectedCell}
              onNumberSelect={handleNumberInput}
            />
          </div>

          {/* Game Panel */}
          <div className="space-y-6">
            <GameStats 
              elapsedTime={gameState.elapsedTime}
              isComplete={gameState.isComplete}
            />
            
            <GameControls
              onNewGame={newGame}
              onSolve={solvePuzzle}
              disabled={gameState.isComplete}
            />
          </div>
        </div>
      </div>
    </div>
  );
};