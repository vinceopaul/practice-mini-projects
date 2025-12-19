let gameScore = {
  playerScore: 0,
  computerScore: 0,
};

const DISPLAY_CHOICE = {
  rock: "✊",
  paper: "✋",
  scissors: "✌️",
};

const ROUND_RESULT = {
  TIE: "TIE",
  WIN: "YES",
  LOSE: "NO",
};

const GAME_RESULT = {
  PLAYER_WINS: "player_wins",
  COMPUTER_WINS: "computer_wins",
};

const GAME_RESULT_MSG = {
  player_wins: "Congrats! Player Wins!",
  computer_wins: "Computer Wins! Better luck Next time!",
};

const disableChoiceBtns = () => {
  const playerChoices = document.querySelectorAll(".controls > button");
  playerChoices.forEach((buttonChoice) => {
    buttonChoice.setAttribute("disabled", "");
  });
};

const createRoundResultIcon = (didPlayerWin) => {
  const CHECK_ICON_SVG = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z" fill="#000000"></path></svg>`;

  const CROSS_ICON_SVG = `<svg viewBox="0 0 32 32" fill="#000000" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M16 2C8.28 2 2 8.28 2 16s6.28 14 14 14 14-6.28 14-14S23.72 2 16 2zm4.24 18.24a1 1 0 0 1-1.41 0L16 17.41l-2.83 2.83a1 1 0 1 1-1.41-1.41L14.59 16l-2.83-2.83a1 1 0 0 1 1.41-1.41L16 14.59l2.83-2.83a1 1 0 1 1 1.41 1.41L17.41 16l2.83 2.83a1 1 0 0 1 0 1.41z"/>
</svg>`;

  const iconSpan = document.createElement("span");

  if (didPlayerWin === ROUND_RESULT.LOSE) {
    iconSpan.className = "cross-mark";
    iconSpan.innerHTML = CROSS_ICON_SVG;
  } else {
    iconSpan.className = "check-mark";
    iconSpan.innerHTML = CHECK_ICON_SVG;
  }

  return iconSpan;
};

const displayRoundResultIcon = (result) => {
  if (result === ROUND_RESULT.TIE) {
    return;
  }
  const displayRoundResult = document.querySelector(".round-history");

  const resultIcon = createRoundResultIcon(result);

  displayRoundResult.appendChild(resultIcon);
};

const ROUND_MSG = (result, playerChoice, computerChoice) => {
  const message = {
    YES: `You win! ${playerChoice} wins ${computerChoice}`,
    NO: `You lose! ${computerChoice} wins ${playerChoice}`,
    TIE: "It's a tie! Play Again!",
  };

  return message[result];
};

const displayRoundResult = (
  playerChoice,
  computerChoice,
  result,
  gameStatus
) => {
  const resultMsg = ROUND_MSG(result, playerChoice, computerChoice, gameStatus);
  const displayResult = document.querySelector(".result-message");

  if (!gameStatus) {
    // Display resultMsg if no current winner
    displayResult.firstElementChild.textContent = resultMsg;
  } else {
    displayResult.firstElementChild.textContent = GAME_RESULT_MSG[gameStatus];
    disableChoiceBtns();
  }
};

const displayChoice = (playerChoice, computerChoice) => {
  const displayChoice = document.querySelector(".choices");
  displayChoice.firstElementChild.textContent = DISPLAY_CHOICE[computerChoice];
  displayChoice.lastElementChild.textContent = DISPLAY_CHOICE[playerChoice];
};

function displayRound(roundData) {
  displayChoice(roundData.playerChoice, roundData.computerChoice);
  displayRoundResult(
    roundData.playerChoice,
    roundData.computerChoice,
    roundData.result,
    roundData.gameStatus
  );
  displayRoundResultIcon(roundData.result);
}

const checkWinner = (currentScore) => {
  if (currentScore.playerScore !== 5 && currentScore.computerScore !== 5) {
    return;
  }

  return currentScore.playerScore === 5
    ? GAME_RESULT.PLAYER_WINS
    : GAME_RESULT.COMPUTER_WINS;
};

const updateScore = (didPlayerWin, currentScore) => {
  if (didPlayerWin === ROUND_RESULT.TIE) {
    return currentScore;
  }

  return {
    playerScore:
      didPlayerWin === ROUND_RESULT.WIN
        ? currentScore.playerScore + 1
        : currentScore.playerScore,
    computerScore:
      didPlayerWin === ROUND_RESULT.LOSE
        ? currentScore.computerScore + 1
        : currentScore.computerScore,
  };
};

function getWinningChoice(pChoice) {
  const beats = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
  };
  return beats[pChoice];
}

const getRoundResult = (playerChoice, computerChoice) => {
  let didPlayerWin = "";

  if (playerChoice === computerChoice) {
    didPlayerWin = ROUND_RESULT.TIE;
  } else if (computerChoice === getWinningChoice(playerChoice)) {
    didPlayerWin = ROUND_RESULT.WIN;
  } else {
    didPlayerWin = ROUND_RESULT.LOSE;
  }

  return didPlayerWin;
};

const getComputerChoice = () => {
  const randVal = Math.round(Math.random() * 2);
  const choice = ["rock", "paper", "scissors"][randVal];
  return choice;
};

function playRound(playerChoice, currentScore) {
  const computerChoice = getComputerChoice();
  const result = getRoundResult(playerChoice, computerChoice);
  const newScore = updateScore(result, currentScore);
  const gameStatus = checkWinner(newScore);

  return {
    playerChoice,
    computerChoice,
    result,
    newScore,
    gameStatus,
  };
}

const startRound = (buttonChoice, currentScore) => {
  const roundData = playRound(buttonChoice, currentScore);
  gameScore = roundData.newScore;
  displayRound(roundData);
};

const playerChoices = document.querySelectorAll(".controls > button");
playerChoices.forEach((buttonChoice) => {
  buttonChoice.addEventListener("click", () => {
    startRound(buttonChoice.className, gameScore);
  });
});
