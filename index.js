const LENGTH = 5;
const GUESSES = LENGTH + 1;

let guesses = [];
let running = true;
let currentGuess = "";
let lockedGuess = "";
let runningAnim = false;

let hashDate = (date) => {
  return date.getFullYear() + date.getMonth() + date.getDate();
};

const currentWord =
  ANSWERS[hashDate(new Date()) % ANSWERS.length].toUpperCase();

let startGame = () => {
  guesses = [];
  let boardElement = document.getElementById("board");

  boardElement.innerHTML = "";

  for (let i = 0; i < GUESSES; i++) {
    let row = document.createElement("div");
    row.classList.add("row");
    row.id = "row" + i;
    boardElement.appendChild(row);

    for (let j = 0; j < LENGTH; j++) {
      let cell = document.createElement("div");
      cell.classList.add("cell");
      cell.id = "row" + i + "cell" + j;
      cell.classList.add("unguessed");
      row.appendChild(cell);
    }
  }

  running = true;
  currentGuess = "";
};

startGame();

let updateBoard = () => {
  if (runningAnim) return;
  for (let i = 0; i < LENGTH; i++) {
    let cell = document.getElementById(
      "row" + guesses.length + "cell" + (LENGTH - i - 1)
    );
    cell.innerHTML = currentGuess[i] || "";
  }
};

let addLetter = (letter) => {
  if (currentGuess.length < LENGTH) currentGuess += letter;
};

let handleButtonPress = (button) => {
  if (!running || runningAnim) {
    return;
  }

  if (button.id === "backspace") {
    currentGuess = currentGuess.slice(0, -1);
  } else if (button.id === "enter") {
    handleGuess();
  } else {
    addLetter(button.id);
  }

  updateBoard();
};

onkeyup = (event) => {
  if (!running || runningAnim || !event.key.match(/[a-z]/i)) {
    return;
  }

  if (event.key === "Backspace") {
    currentGuess = currentGuess.slice(0, -1);
  } else if (event.key === "Enter") {
    handleGuess();
  } else {
    addLetter(event.key.toUpperCase());
  }

  updateBoard();
};

let buttons = document.getElementsByClassName("letter");

for (let button of buttons) {
  button.addEventListener("click", () => {
    handleButtonPress(button);
  });
}

let handleGuess = () => {
  if (currentGuess.length !== LENGTH) {
    Toastify({
      text: "Not enough letters",
      duration: 1000,
      newWindow: false,
      close: false,
      gravity: "top",
      position: "center",
      stopOnFocus: false,
      className: "toast",
    }).showToast();

    return;
  }

  if (!WORDS.includes(currentGuess.toLowerCase())) {
    Toastify({
      text: "Not in word list",
      duration: 1000,
      newWindow: false,
      close: false,
      gravity: "top",
      position: "center",
      stopOnFocus: false,
      className: "toast",
    }).showToast();

    return;
  }

  lockedGuess = currentGuess;
  runningAnim = true;
  currentGuess = "";

  for (let i = 0; i < LENGTH; i++) {
    let cell = document.getElementById(
      "row" + guesses.length + "cell" + (LENGTH - i - 1)
    );

    setTimeout(() => {
      cell.classList.remove("unguessed");
    }, 50 * (LENGTH - i));

    setTimeout(() => {
      cell.classList.add("guessed");

      if (lockedGuess[i] === currentWord[i]) {
        cell.classList.add("correct");
        document
          .getElementById(lockedGuess[i].toUpperCase())
          .classList.add("correct");
      } else if (currentWord.includes(lockedGuess[i])) {
        cell.classList.add("present");
        document
          .getElementById(lockedGuess[i].toUpperCase())
          .classList.add("present");
      } else {
        cell.classList.add("absent");
        document
          .getElementById(lockedGuess[i].toUpperCase())
          .classList.add("absent");
      }
    }, 300 * (i + 1) + 300);
  }
  console.log(GUESSES, guesses.length);

  if (lockedGuess === currentWord) {
    running = false;
    setTimeout(() => {
      Toastify({
        text: "You win!",
        duration: 1000,
        newWindow: false,
        close: false,
        gravity: "top",
        position: "center",
        stopOnFocus: false,
        className: "toast",
      }).showToast();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }, 2000);
  } else if (guesses.length == GUESSES - 1) {
    running = false;

    setTimeout(() => {
      Toastify({
        text: "You lose!",
        duration: 1000,
        newWindow: false,
        close: false,
        gravity: "top",
        position: "center",
        stopOnFocus: false,
        className: "toast",
      }).showToast();
    }, 2000);
  }
  setTimeout(() => {
    guesses.push(lockedGuess);
    lockedGuess = "";
    runningAnim = false;
    updateBoard();
  }, 2000);
};
