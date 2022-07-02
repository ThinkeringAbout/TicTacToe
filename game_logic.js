let playerText = document.getElementById('playerText');
let restartBtn = document.getElementById('restartBtn');
let switchBtn = document.getElementById('switchBtn');
let boxes = Array.from(document.getElementsByClassName('box'));
let container = document.getElementById('container');
let isPlayable = 0;

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks');
let bgColor = getComputedStyle(document.body).getPropertyValue('--background-color');
let styleColor = getComputedStyle(document.body).getPropertyValue('--style2-color');
let winColor = getComputedStyle(document.body).getPropertyValue('--style2-win');
let orange = getComputedStyle(document.body).getPropertyValue('--orange');

const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;
let spaces = Array(9).fill(null);

console.log(spaces);

const startGame = () => {
  boxes.forEach(box => box.addEventListener('click', boxClicked))
}

function boxClicked(e) {
  const id = e.target.id;
  if(!spaces[id] && isPlayable == 0) {
    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;

    if(playerHasWon() !== false) {
      playerText.innerText = `${currentPlayer} has won!`;
      let winning_blocks = playerHasWon();
      winning_blocks.map(box => boxes[box].style.backgroundColor = winnerIndicator);
      return 0;
    }

    currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;
  }
}

const winningCombos = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,4,8],
  [2,4,6],
  [0,3,6],
  [1,4,7],
  [2,5,8]
]

function playerHasWon() {
  for (const condition of winningCombos) {
    let [a, b, c] = condition;

    if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
      isPlayable = 1;
      return [a, b, c];
    }
  }
  return false;
}

restartBtn.addEventListener('click', restart);
switchBtn.addEventListener('click', switchTheme);

function switchTheme() {
  container.classList.toggle('dark_theme');
  restartBtn.classList.toggle('dark_theme_btn');
  switchBtn.classList.toggle('dark_theme_btn');
  boxes.forEach(box => {
    box.classList.toggle('dark_theme_field');
  })
}

function restart() {
  spaces.fill(null);
  boxes.forEach(box => {
    box.innerText = '';
    box.style.backgroundColor = '';
  })

  playerText.innerText = 'Tic Tac Toe';
  isPlayable = 0;

  currentPlayer = X_TEXT;
}

startGame();
