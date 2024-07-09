const socket = io('http://localhost:8080')


const cells = document.querySelectorAll('.cell');
const statusDiv = document.getElementById('status');
const restartButton = document.getElementById('restart');

let currentPlayer = 'X';
let board = Array(9).fill(null);
let isGameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellClick(event) {
  const index = event.target.dataset.index;

  if (!board[index] && isGameActive) {
    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    socket.emit('click',{index:index,player:currentPlayer})
    checkWinner();
    if (isGameActive) {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      statusDiv.textContent = `Player ${currentPlayer}'s turn`;
    }
  }
}

function checkWinner() {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      statusDiv.textContent = `Player ${board[a]} wins! 🎉 You Win!`;
      isGameActive = false;
      return;
    }
  }

  if (!board.includes(null)) {
    statusDiv.textContent = 'It\'s a draw!';
    isGameActive = false;
  }
}

function restartGame() {
  board = Array(9).fill(null);
  cells.forEach(cell => (cell.textContent = ''));
  currentPlayer = 'X';
  isGameActive = true;
  statusDiv.textContent = `Player ${currentPlayer}'s turn`;

  socket.emit('restart');
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);

statusDiv.textContent = `Player ${currentPlayer}'s turn`;


socket.on('move',(data)=>{
    board[data.index] = data.player;
    document.querySelector(`.cell[data-index='${data.index}']`).textContent = data.player;
    checkWinner();
    if (isGameActive) {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      statusDiv.textContent = `Player ${currentPlayer}'s turn`;
    }
})

socket.on('restart', () => {
  board = Array(9).fill(null);
  cells.forEach(cell => (cell.textContent = ''));
  currentPlayer = 'X';
  isGameActive = true;
  statusDiv.textContent = `Player ${currentPlayer}'s turn`;
});
