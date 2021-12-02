const class_x = "x";
const class_circle = "circle";
const cellElements = document.querySelectorAll("[data-cell]");
let circleTurn;
const restartButton = document.getElementById("restartButton");
const winningMessageElement = document.getElementById("winningMessage");
const board = document.getElementById("board");
const winningMessageText = document.querySelector("[data-winning-message]");

const Winning_combinations = [
  [0, 1, 2],
  [0, 3, 6],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

startGame();

restartButton.addEventListener("click", startGame);

function startGame() {
  circleTurn = false;

  cellElements.forEach((cell) => {
    cell.classList.remove(class_x);
    cell.classList.remove(class_circle);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setHoverMark();
  winningMessageElement.classList.remove("show");
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? class_circle : class_x;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setHoverMark();
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageText.innerText = "Draw!";
  } else {
    winningMessageText.innerText = `${circleTurn ? "O Wins!" : "X Wins!"}`;
  }
  winningMessageElement.classList.add("show");
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(class_x) || cell.classList.contains(class_circle)
    );
  });
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function setHoverMark() {
  board.classList.remove(class_x);
  board.classList.remove(class_circle);
  if (circleTurn) {
    board.classList.add(class_circle);
  } else {
    board.classList.add(class_x);
  }
}

function checkWin(currentClass) {
  return Winning_combinations.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
