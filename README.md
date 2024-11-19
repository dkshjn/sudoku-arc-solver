# Sudoku Solver with Arc Consistency

This project showcases an interactive Sudoku solver powered by **arc consistency**. The goal is to dynamically compute valid domains for cells and assist users in solving puzzles efficiently. The user interface is designed to be intuitive, allowing manual edits, puzzle generation, and automated solving.

## Features

1. **Interactive Board**:  
   - Clickable cells for easy selection and editing.  
   - Displays possible domain values for empty cells dynamically.  

2. **Puzzle Generation**:  
   - Predefined puzzles across five difficulty levels: Very Easy to Hell.  
   - Option for creating custom puzzles.  

3. **Arc Consistency**:  
   - Continuously refines domains based on rows, columns, and 3x3 subgrid constraints.  
   - Refines possible domain values and assigns them when certain.

4. **Step-by-Step Solving**:  
   - Logs domain reductions and value assignments at each step.  
   - Allows users to follow the solving process in real time.  

5. **Dynamic Feedback**:  
   - Tooltips and domain tables provide clarity on potential moves.  


## Project Overview

- **HTML**: Lays out the Sudoku board, controls, and log panel.  
- **CSS**: Styles the grid, subgrids, tooltips, and highlights.  
- **JavaScript**: Implements the solving logic, manages the board state, and handles interactions.  


## How It Works

1. **Board Initialization**:  
   The Sudoku board starts as a 9x9 grid with all cells having domains `[1–9]`.

2. **Arc Consistency**:  
   The algorithm refines cell domains by eliminating values conflicting with other cells in the same row, column, or subgrid.

3. **User Interaction**:  
   Users can edit the board, view possible values on hover, and see real-time updates as domains change.


## Usage

1. **Open the Project**:  
   Visit the site https://dkshjn.github.io/sudoku-arc-solver/

2. **Choose a Puzzle**:  
   Select a difficulty level or create your own puzzle.

3. **Solve the Puzzle**:  
   Use the "Solve Using Arc Consistency" button to watch the solution unfold step by step.

## Key Functions

- **Board Management**:  
  `createBoard()`, `updateBoard()`, `getValidValues(row, col)`  

- **Puzzle Handling**:  
  `generatePuzzle(difficulty)`, `clearSelectedCell()`  

- **Arc Consistency**:  
  `applyArcConsistency()`, `applyArcConsistencyToSolve()`  

- **Interactivity**:  
  `handleCustomInput(row, col, value)`, `selectCell(cell, row, col)`  
