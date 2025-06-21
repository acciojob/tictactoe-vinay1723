//your JS code here. If required.
const form = document.querySelector("form");
const board = document.querySelector(".board");
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const playerHeading = document.querySelector(".message");
let currentPlayer;

const playerNum1 = {
  name: "",
  mark: "❌",
};
const playerNum2 = {
  name: "",
  mark: "⭕",
};

const playerMarks = new Array(9).fill("");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  form.style.cssText = "display:none";
  board.style.cssText = "display:grid";
  playerNum1.name = player1.value;
  playerNum2.name = player2.value;
  currentPlayer = playerNum1;
  playerHeading.textContent = `${currentPlayer.name}, you're up`;
  playerHeading.style.cssText = "display:block";
});

board.addEventListener("click", (e) => {
  e.preventDefault();
  let currCell = e.target;
  let currId = parseInt(currCell.getAttribute("id")) - 1;
  if (
    currCell.textContent === "" &&
    !checkWinner(playerMarks, currentPlayer.mark)
  ) {
    currCell.textContent = currentPlayer.mark;
    playerMarks[currId] = currentPlayer.mark;

    if (playerMarks.filter((mark) => mark !== "").length >= 5) {
	  const winningPattern = checkWinner(playerMarks, currentPlayer.mark);
      if (winningPattern) {
        playerHeading.textContent = `${currentPlayer.name}, congratulations You won!`;
        board.style.pointerEvents = "none";
		winningPattern.forEach((index) => {
			document.getElementById((index+1).toString()).classList.add('highlight');
		})  
        return;
      }
    }

    if (!playerMarks.includes("")) {
      playerHeading.textContent = "Hurray Its Draw 🥲🥲";
      return;
    }
    currentPlayer = currentPlayer === playerNum1 ? playerNum2 : playerNum1;
    playerHeading.textContent = `${currentPlayer.name}, you're up`;
  }
});

function checkWinner(board, mark) {
  const patterns = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // main diagonal
    [2, 4, 6], // anti diagonal
  ];

    for (let pattern of patterns) {
    if (pattern.every(index => board[index] === mark)) {
      return pattern; // return the winning pattern
    }
  }

  return null;
}
