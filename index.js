const LENGTH = 5;
const GUESSES = LENGTH + 1;

let hashDate = (date) => {
  return date.getFullYear() + date.getMonth() + date.getDate();
};

const currentWord = ANSWERS[hashDate(new Date()) % ANSWERS.length];

// initialize board

let guesses = [];
let boardElement = document.getElementById("board");

boardElement.innerHTML = "";

for (let i = 0; i < GUESSES; i++) {
  let row = document.createElement("div");
  row.classList.add("row");
  row.id = "row" + i;
  boardElement.appendChild(row);

  for (let i = 0; i < LENGTH; i++) {
    let cell = document.createElement("div");
    cell.classList.add("cell");
    cell.id = "cell" + i;
    row.appendChild(cell);
  }
}

let running = true;
let currentGuess = "";

let updateBoard = () => {
  let row = document.getElementById("row" + guesses.length);
  for (let i = LENGTH; i > 0; i--) {
    let cell = document.getElementById("cell" + i);
    cell.innerHTML = currentGuess[i] || "";
  }
};
