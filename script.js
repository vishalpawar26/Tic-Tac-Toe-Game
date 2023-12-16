const boxes = document.querySelectorAll(".box");
const newGameButton = document.querySelector(".new-game-button");
const winnerName = document.querySelector(".winner");
const playerTurn = document.querySelector(".player-turn");

let turn = "X";
let gameCompleted = false;
let count = 0;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8]
];

let disableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
}

let enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
  });
}

let showPlayerTurn = (turn) => {
  playerTurn.textContent = `Current Player: ${turn}`;
}

let gameTied = () => {
  if (count === 9 && !gameCompleted) {
    winnerName.textContent = "Game Tied!";
    winnerName.style.display = "block";
    playerTurn.style.display = "none";
  }
}

let newGame = () => {
  turn = 'X';
  playerTurn.textContent = `Current Player: ${turn}`;
  count = 0;
  gameCompleted = false;
  enableBoxes();
  winnerName.style.display = "none";
  playerTurn.style.display = "block";
  boxes.forEach((box) => {
    box.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
    box.textContent = '';
  });
}

let showWinner = (winner) => {
  winnerName.textContent = `Winner: ${winner}`;
  winnerName.style.display = "block";
  
  disableBoxes();
  playerTurn.style.display = "none";
}

let checkWinner = () => {
  for (let pattern of winPatterns) {
    let posOneValue = boxes[pattern[0]].textContent;
    let posTwoValue = boxes[pattern[1]].textContent;
    let posThreeValue = boxes[pattern[2]].textContent;

    if (posOneValue != '' && posTwoValue != '' && posThreeValue != '') {
      if (posOneValue === posTwoValue && posTwoValue === posThreeValue) {
        boxes[pattern[0]].style.backgroundColor = "rgba(0, 255, 0, 0.1)";
        boxes[pattern[1]].style.backgroundColor = "rgba(0, 255, 0, 0.1)";
        boxes[pattern[2]].style.backgroundColor = "rgba(0, 255, 0, 0.1)";
        gameCompleted = true;
        showWinner(posOneValue);
      }
    }
  }
}

boxes.forEach((box) => {
  showPlayerTurn(turn);
  box.addEventListener("click", () => {
    if (turn === 'X') { // turn of X player
      box.textContent = 'X';
      turn = 'O';
      showPlayerTurn('O');
    }
    else { // turn of O player
      box.textContent = 'O';
      turn = 'X';
      showPlayerTurn('X');
    }
    box.disabled = true;
    count++;
    checkWinner();
    gameTied();
  });
});

newGameButton.addEventListener("click", newGame);
