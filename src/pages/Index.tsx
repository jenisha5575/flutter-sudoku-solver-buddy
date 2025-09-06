import { SudokuGame } from "@/components/sudoku/SudokuGame";
import { ThemeToggle } from "@/components/ThemeToggle";

const Index = () => {
  return (
    <div className="relative">
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      <SudokuGame />
    </div>
  );
};

export default Index;
