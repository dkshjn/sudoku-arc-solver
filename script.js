// Initialize board, domains, and editable cells
const board = Array(9).fill(null).map(() => Array(9).fill(''));
const domains = Array(9).fill(null).map(() => Array(9).fill([1,2,3,4,5,6,7,8,9]));
const editableCells = Array(9).fill(null).map(() => Array(9).fill(false)); // Tracks initially editable cells

// Sample puzzles for each difficulty level
const samplePuzzles = {
  very_easy: [
      [5, 3, '', '', 7, '', '', '', ''],
      [6, '', '', 1, 9, 5, '', '', ''],
      ['', 9, 8, '', '', '', '', 6, ''],
      [8, '', '', '', 6, '', '', '', 3],
      [4, '', '', 8, '', 3, '', '', 1],
      [7, '', '', '', 2, '', '', '', 6],
      ['', 6, '', '', '', '', 2, 8, ''],
      ['', '', '', 4, 1, 9, '', '', 5],
      ['', '', '', '', 8, '', '', 7, 9]
  ],

  easy: [
      ['', '', '', 2, 6, '', 7, '', 1],
      [6, 8, '', '', 7, '', '', 9, ''],
      [1, 9, '', '', '', 4, 5, '', ''],
      [8, 2, '', 1, '', '', '', 4, ''],
      ['', '', 4, 6, '', 2, 9, '', ''],
      ['', 5, '', '', '', 3, '', 2, 8],
      ['', '', 9, 3, '', '', '', 7, 4],
      ['', 4, '', '', 5, '', '', 3, 6],
      [7, '', 3, '', 1, 8, '', '', '']
  ],

  medium: [
      ['', 2, '', 6, '', 8, '', '', ''],
      [5, 8, '', '', '', 9, 7, '', ''],
      ['', '', '', '', 4, '', '', '', ''],
      [3, 7, '', '', '', '', 5, '', ''],
      [6, '', '', '', '', '', '', '', 4],
      ['', '', 8, '', '', '', '', 1, 3],
      ['', '', '', '', 2, '', '', '', ''],
      ['', '', 9, 8, '', '', '', 3, 6],
      ['', '', '', 3, '', 6, '', 9, '']
  ],

  hard: [
      ['', '', '', '', '', 5, '', '', ''],
      ['', '', '', 1, '', 9, '', '', 3],
      ['', '', '', '', '', '', '', '', ''],
      [1, 9, '', '', '', '', 6, '', ''],
      ['', '', 8, '', 2, '', 3, '', ''],
      ['', '', 2, '', '', '', '', 8, 4],
      ['', '', '', '', '', '', '', '', ''],
      [3, '', '', 5, '', 1, '', '', ''],
      ['', '', '', '', 9, '', '', '', '']
  ],

  hell: [
      [8, '', '', '', '', '', '', '', ''],
      ['', '', 3, 6, '', '', '', '', ''],
      ['', 7, '', '', 9, '', 2, '', ''],
      ['', 5, '', '', '', 7, '', '', ''],
      ['', '', '', '', 4, 5, 7, '', ''],
      ['', '', '', 1, '', '', '', 3, ''],
      ['', '', 1, '', '', '', '', 6, 8],
      ['', '', 8, 5, '', '', '', 1, ''],
      ['', 9, '', '', '', '', 4, '', '']
  ]
};


// Track the currently selected cell
let selectedCell = null;

// Create and display the board
function createBoard() {
    console.log("Creating Sudoku Board");
    const boardDiv = document.getElementById('sudokuBoard');
    boardDiv.innerHTML = '';

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const cell = document.createElement('div');
            cell.className = 'cell';

            // Add borders for 3x3 subgrid
            if (row % 3 === 2 && row !== 8) cell.classList.add('subgrid');
            if (col % 3 === 2 && col !== 8) cell.classList.add('subgrid');

            cell.onclick = () => {
                showDomain(row, col);
                selectCell(cell, row, col); // Select cell on click
            };

            cell.textContent = board[row][col] || '';

            // Only allow input for initially empty cells
            if (board[row][col] === '') {
                editableCells[row][col] = true; // Mark as initially editable
                cell.contentEditable = "true";

                cell.addEventListener('input', (e) => handleCustomInput(row, col, e.target.textContent.trim()));
                cell.addEventListener('mouseenter', displayDomainTooltip);
                cell.addEventListener('mouseleave', hideDomainTooltip);
            }

            cell.dataset.row = row;
            cell.dataset.col = col;
            boardDiv.appendChild(cell);
        }
    }
}

// Function to select a cell for clearing
function selectCell(cell, row, col) {
    if (editableCells[row][col]) {
        if (selectedCell) selectedCell.cell.classList.remove('selected');
        selectedCell = { cell, row, col };
        cell.classList.add('selected');
        console.log(`Selected cell at [${row}, ${col}]`);
    } else {
        console.log(`Cell at [${row}, ${col}] is not editable and cannot be selected.`);
    }
}

// Clear content of the selected cell if it was initially editable
function clearSelectedCell() {
    if (selectedCell && editableCells[selectedCell.row][selectedCell.col]) {
        console.log(`Clearing content of cell at [${selectedCell.row}, ${selectedCell.col}]`);
        selectedCell.cell.textContent = '';
        board[selectedCell.row][selectedCell.col] = '';
        selectedCell.cell.classList.remove('invalid');
        hideDomainTooltip({ target: selectedCell.cell });
        applyArcConsistency(); // Recalculate domains for affected cells
        updateBoard();
    } else {
        console.log("No editable cell is selected for clearing.");
    }
}

// Handle custom input, allowing free editing
function handleCustomInput(row, col, value) {
    if (!editableCells[row][col]) {
        console.log(`Cell at [${row}, ${col}] is not editable.`);
        return;
    }
    const cell = document.querySelector(`.sudoku-board :nth-child(${row * 9 + col + 1})`);
    const numValue = parseInt(value);

    hideDomainTooltip({ target: cell });

    if (value === '') {
        console.log(`Clearing value at [${row}, ${col}]`);
        board[row][col] = '';
        cell.classList.remove('invalid');
    } else if (numValue >= 1 && numValue <= 9) {
        console.log(`Setting value ${numValue} at [${row}, ${col}]`);
        board[row][col] = numValue;
        if (domains[row][col].includes(numValue)) cell.classList.remove('invalid');
        else cell.classList.add('invalid');
    } else {
        console.log(`Invalid input at [${row}, ${col}]`);
        board[row][col] = '';
    }
    applyArcConsistency();
    updateBoard();
}

// Display domain values on hover
function displayDomainTooltip(event) {
    const row = event.target.dataset.row;
    const col = event.target.dataset.col;

    if (board[row][col] === '') {
        const tooltipContent = `Possible values: ${domains[row][col].join(', ')}`;
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = tooltipContent;
        tooltip.style.top = `${event.target.offsetTop - 30}px`;
        tooltip.style.left = `${event.target.offsetLeft}px`;

        document.body.appendChild(tooltip);
        event.target.tooltip = tooltip;
    }
}

// Hide tooltip on mouse leave
function hideDomainTooltip(event) {
    const tooltip = event.target.tooltip;
    if (tooltip) {
        tooltip.remove();
        event.target.tooltip = null;
    }
}

// Show domain values in the domain table
function showDomain(row, col) {
    const domainTable = document.getElementById('domainTable');
    if (board[row][col] === '') {
        domainTable.innerHTML = `Possible values for cell [${row + 1}, ${col + 1}]: ${domains[row][col].join(', ')}`;
    } else {
        domainTable.innerHTML = `Cell [${row + 1}, ${col + 1}] is pre-filled.`;
    }
}

// Apply arc consistency to update domains only (no solving)
function applyArcConsistency() {
    console.log("Applying arc consistency to display domains");
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === '') {
                domains[row][col] = getValidValues(row, col);
            }
        }
    }
    updateBoard();
}

// Function to solve the puzzle by applying arc consistency
function applyArcConsistencyToSolve() {
  console.log("Starting to solve using arc consistency...");
  const logStepsDiv = document.getElementById('logSteps');
  logStepsDiv.innerHTML = ''; // Clear previous log
  stepCounter = 1; // Reset step counter

  let changed = true;
  while (changed) {
      changed = false;

      for (let row = 0; row < 9; row++) {
          for (let col = 0; col < 9; col++) {
              if (board[row][col] === '') {
                  const possibleValues = getValidValues(row, col);

                  // Log domain reduction
                  if (possibleValues.length < domains[row][col].length) {
                      domains[row][col] = possibleValues;
                      logStep(
                          "Reduced Domain",
                          `Cell [${row + 1}, ${col + 1}] possible values: ${possibleValues.join(', ')}`
                      );
                      changed = true;
                  }

                  // Log value assignment
                  if (possibleValues.length === 1) {
                      board[row][col] = possibleValues[0];
                      logStep(
                          "Filled Value",
                          `Cell [${row + 1}, ${col + 1}] assigned value: ${possibleValues[0]}`
                      );
                      changed = true;
                  }
              }
          }
      }
  }

  logStep("Finished", "Puzzle solved using arc consistency.");
  console.log("Finished solving process.");
  updateBoard();
}


// Function to log each step in the side column
let stepCounter = 1;

function logStep(action, details) {
    const logStepsDiv = document.getElementById('logSteps');
    if (!logStepsDiv) {
        console.warn("Log container not found.");
        return;
    }

    // Create a container for the log step
    const stepDiv = document.createElement('div');
    stepDiv.className = 'log-step';

    // Add the step number
    const stepNumber = document.createElement('div');
    stepNumber.className = 'step-number';
    stepNumber.textContent = `Step ${stepCounter++}:`;

    // Add the main action
    const stepAction = document.createElement('div');
    stepAction.className = 'step-action';
    stepAction.innerHTML = `<strong>${action}</strong>`;

    // Add additional details (if any)
    if (details) {
        const stepDetails = document.createElement('div');
        stepDetails.className = 'step-details';
        stepDetails.textContent = details;
        stepAction.appendChild(stepDetails);
    }

    // Append to the log container
    stepDiv.appendChild(stepNumber);
    stepDiv.appendChild(stepAction);
    logStepsDiv.appendChild(stepDiv);
}


// Get valid values for a cell
function getValidValues(row, col) {
    const used = new Set();
    for (let i = 0; i < 9; i++) {
        if (board[row][i]) used.add(board[row][i]);
        if (board[i][col]) used.add(board[i][col]);
        const subgridRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
        const subgridCol = 3 * Math.floor(col / 3) + (i % 3);
        if (board[subgridRow][subgridCol]) used.add(board[subgridRow][subgridCol]);
    }
    return Array.from({ length: 9 }, (_, i) => i + 1).filter(n => !used.has(n));
}

// Update the board
function updateBoard() {
    console.log("Updating board");
    createBoard();
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const cell = document.querySelector(`.sudoku-board :nth-child(${row * 9 + col + 1})`);
            cell.textContent = board[row][col] || '';
        }
    }
}

// Generate puzzle
function generatePuzzle(difficulty) {
    console.log(`Generating puzzle for difficulty: ${difficulty}`);
    if (difficulty === 'custom') {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                board[row][col] = '';
                editableCells[row][col] = true;
            }
        }
    } else if (samplePuzzles[difficulty]) {
        console.log(`Loading puzzle: ${samplePuzzles[difficulty]}`);
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                board[row][col] = samplePuzzles[difficulty][row][col] || '';
                editableCells[row][col] = samplePuzzles[difficulty][row][col] === '' ? true : false;
            }
        }
    }
    updateBoard();
    applyArcConsistency();
}

// Initialize the board
createBoard();
