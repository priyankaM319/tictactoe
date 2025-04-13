const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const status = document.getElementById("status");
const resetButton = document.getElementById("reset");
const newGameButton = document.getElementById("new-game");
const resultScreen = document.getElementById("result-screen");
const resultMessage = document.getElementById("result-message");
const newGameResultButton = document.getElementById("new-game-result");

let currentPlayer = "X";
let gameActive = true;
let boardState = ["", "", "", "", "", "", "", "", ""];

const checkWinner = () => {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            gameActive = false;
            resultMessage.textContent = `Player ${currentPlayer} wins!`;
            resultScreen.style.display = "block";
            newGameButton.style.display = "inline-block"; // Show New Game button
            resetButton.style.display = "none"; // Hide Reset button
            return;
        }
    }

    if (!boardState.includes("")) {
        gameActive = false;
        resultMessage.textContent = "It's a draw!";
        resultScreen.style.display = "block";
        newGameButton.style.display = "inline-block"; // Show New Game button
        resetButton.style.display = "none"; // Hide Reset button
    }
};

const handleCellClick = (event) => {
    const cellIndex = event.target.getAttribute("data-cell");

    if (boardState[cellIndex] || !gameActive) return;

    boardState[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;

    checkWinner();

    if (gameActive) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        status.textContent = `Player ${currentPlayer}'s turn`;
    }
};

const resetGame = () => {
    boardState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    status.textContent = `Player ${currentPlayer}'s turn`;

    cells.forEach(cell => cell.textContent = "");
    resultScreen.style.display = "none";
    newGameButton.style.display = "none"; // Hide New Game button
    resetButton.style.display = "inline-block"; // Show Reset button
};

const startNewGame = () => {
    resetGame();
    resultScreen.style.display = "none"; // Hide result screen
};

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);
newGameButton.addEventListener("click", startNewGame);
newGameResultButton.addEventListener("click", startNewGame);
