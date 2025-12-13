//Rock Paper Scissors
//*November 01, 2025
//*To adjust after learning DOM (TENTATIVE):
//* 1) Title Case win or lose text
//* 2) Object lookup for messages
//* 3) Remove adjustTieGameRound() and follow the RPS best of 3 or 5 rule

const createRoundResultIcon = (didPlayerWin) => {
  const CHECK_ICON_SVG = `<svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z" fill="#000000"></path></svg>`;

  const CROSS_ICON_SVG = `<svg width="18px" height="18px" viewBox="0 0 32 32" fill="#000000" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M16 2C8.28 2 2 8.28 2 16s6.28 14 14 14 14-6.28 14-14S23.72 2 16 2zm4.24 18.24a1 1 0 0 1-1.41 0L16 17.41l-2.83 2.83a1 1 0 1 1-1.41-1.41L14.59 16l-2.83-2.83a1 1 0 0 1 1.41-1.41L16 14.59l2.83-2.83a1 1 0 1 1 1.41 1.41L17.41 16l2.83 2.83a1 1 0 0 1 0 1.41z"/>
</svg>`;

  const iconSpan = document.createElement("span");
  iconSpan.style.border = "2px solid black";
  iconSpan.style.borderRadius = "12px";

  if (didPlayerWin === "no") {
    iconSpan.className = "cross-mark";
    iconSpan.innerHTML = CROSS_ICON_SVG;
  } else if (didPlayerWin === "yes") {
    iconSpan.className = "check-mark";
    iconSpan.innerHTML = CHECK_ICON_SVG;
  } else {
    iconSpan.className = "tie-mark";
    // iconSpan.textContent = "\u{2796}";
    iconSpan.innerHTML = CHECK_ICON_SVG;
  }

  return iconSpan;
};

function getWinningChoice(pChoice) {
  const beats = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
  };
  return beats[pChoice];
}

function getRoundResult(playerChoice, computerChoice) {
  let resultMsg = "";
  let didPlayerWin = "";
  let getRoundData = [];
  if (playerChoice === computerChoice) {
    resultMsg = "It's a tie! Play Again!";
    didPlayerWin = "tie";
  } else if (computerChoice === getWinningChoice(playerChoice)) {
    resultMsg = `You win! ${playerChoice} wins ${computerChoice}`;
    didPlayerWin = "yes";
  } else {
    resultMsg = `You lose! ${computerChoice} wins ${playerChoice}`;
    didPlayerWin = "no";
  }
  getRoundData.push(didPlayerWin, resultMsg);

  return getRoundData;
}

function getComputerChoice() {
  const randVal = Math.round(Math.random() * 2);
  const choice = ["rock", "paper", "scissors"][randVal];
  return choice;
}

function playRound(playerChoice) {
  const playerSelection = playerChoice;
  const computerSelection = getComputerChoice();

  // Display Player and Comp Choice
  const displayChoice = document.querySelector(".displayChoice");
  displayChoice.firstElementChild.textContent = `Player chooses: ${playerSelection}`;
  displayChoice.children[1].textContent = `Computer chooses: ${computerSelection}`;

  // Get Result
  let roundDataResult = [];
  roundDataResult = getRoundResult(playerSelection, computerSelection);
  console.log("roundData,", roundDataResult);

  // Display Round Result
  const displayResult = document.querySelector(".displayResult");
  displayResult.firstElementChild.textContent = roundDataResult.at(1);

  if (roundDataResult.at(0) !== "tie") {
    // Display Round Result Icon
    const displayRoundResult = document.querySelector(".displayRoundResult");

    const resultIcon = createRoundResultIcon(roundDataResult.at(0));

    displayRoundResult.appendChild(resultIcon);

    // Get Number of Player/Comp marks
    checkFinalWinnerStatus(displayRoundResult);
  }
}

const checkFinalWinnerStatus = (displayRoundResult) => {
  const playerMarks = displayRoundResult.getElementsByClassName("check-mark");
  const computerMarks = displayRoundResult.getElementsByClassName("cross-mark");

  if (computerMarks.length === 5) {
    console.log("Computer Wins! Better luck Next time!");
  }
  if (playerMarks.length === 5) {
    console.log("Congrats! Player Wins!");
  }
};

const playerChoices = document.querySelectorAll(".playerChoiceBtns > button");
playerChoices.forEach((buttonChoice) => {
  let playerChoice = "";
  buttonChoice.addEventListener("click", () => {
    playerChoice = buttonChoice.className;
    playRound(playerChoice);
  });
});
