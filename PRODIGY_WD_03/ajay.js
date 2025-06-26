const board = document.getElementById("board");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");

let cells = [];
let currentPlayer = "X";
let gameActive = true;


const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], 
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], 
  [0, 4, 8],
  [2, 4, 6], 
];


function createBoard() {
  board.innerHTML = "";
  cells = [];

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    board.appendChild(cell);
    cells.push("");
  }

  board.addEventListener("click", handleMove);
  statusText.textContent = "Player X's turn";
  gameActive = true;
}


function handleMove(e) {
  const cell = e.target;
  const index = cell.dataset.index;

  if (!gameActive || cells[index] !== "") return;

  cells[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWin()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
  } else if (cells.every(cell => cell !== "")) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "Y" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}


function checkWin() {
  return winCombos.some(combo => {
    return combo.every(index => cells[index] === currentPlayer);
  });
}


restartBtn.addEventListener("click", createBoard);


createBoard();