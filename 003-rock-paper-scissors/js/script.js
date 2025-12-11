//Rock Paper Scissors
//*November 01, 2025
//*To adjust after learning DOM (TENTATIVE):
//* 1) Title Case win or lose text
//* 2) Object lookup for messages
//* 3) Remove adjustTieGameRound() and follow the RPS best of 3 or 5 rule
function getComputerChoice() {
  const randVal = Math.round(Math.random() * 2);
  const choice = ["rock", "paper", "scissors"][randVal];
  return choice;
}
function getWinningChoice(pChoice) {
  const beats = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
  };
  return beats[pChoice];
}

const displayCurrentChoice = (pSelection, compSelection) => {
  const displayChoice = document.querySelector(".displayChoice");
  displayChoice.firstElementChild.textContent = `Player choses: ${pSelection}`;
  displayChoice.children[1].textContent = `Computer choses: ${compSelection}`;
};

function playGame(playerChoice) {
  let playerScore = 0;
  let computerScore = 0;

  function playRound(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) console.log("It's a tie! Play Again!");
    else if (computerChoice === getWinningChoice(playerChoice)) {
      console.log(`You win! ${playerChoice} wins ${computerChoice}`);
      playerScore += 1;
    } else {
      console.log(`You lose! ${computerChoice} wins ${playerChoice}`);
      computerScore += 1;
    }
  }
  const playerSelection = playerChoice;
  const computerSelection = getComputerChoice();

  // Display Player and Comp Choice
  displayCurrentChoice(playerSelection, computerSelection);

  playRound(playerSelection, computerSelection);

  //Score Test
  console.log(playerScore, computerScore);
  console.log(
    playerScore > computerScore
      ? "Congratulation! You win!"
      : "You lose! Better luck next time!"
  );
}

const playerChoices = document.querySelectorAll(".playerChoiceBtns > button");

playerChoices.forEach((buttonChoice) => {
  let playerChoice = "";
  buttonChoice.addEventListener("click", () => {
    playerChoice = buttonChoice.className;
    console.log(playerChoice);
    playGame(playerChoice);
  });
});
