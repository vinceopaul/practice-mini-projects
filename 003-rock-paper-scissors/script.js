//Rock Paper Scissors
function getComputerChoice() {
  const randVal = Math.round(Math.random() * 2);
  const choice = ["rock", "paper", "scissors"][randVal];
  return choice;
}

function getPlayerChoice() {
  const playerChoice = prompt(
    "Hello Player! Type your hand sign:\nRock\nPaper\nScissors"
  );
  return playerChoice.toLowerCase();
}

let playerScore = 0;
let computerScore = 0;

function playRound(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    console.log("It's a tie! Play Again!");
  } else {
    switch (playerChoice) {
      case "rock":
        if (computerChoice === "paper") {
          console.log("You lose! Paper wins Rock!");
          computerScore += 1;
        } else {
          console.log("You win! Rock wins Scissors!");
          playerScore += 1;
        }
        break;
      case "paper":
        if (computerChoice === "scissors") {
          console.log("You lose! Scissors wins Paper!");
          computerScore += 1;
        } else {
          console.log("You win! Paper wins Rock!");
          playerScore += 1;
        }
        break;
      case "scissors":
        if (computerChoice === "rock") {
          console.log("You lose! Rock wins Scissors!");
          computerScore += 1;
        } else {
          console.log("You win! Scissors wins Paper!");
          playerScore += 1;
        }
        break;
    }
  }
}

const playerSelection = getPlayerChoice();
const computerSelection = getComputerChoice();

console.log(playerSelection);
console.log(computerSelection);

playRound(playerSelection, computerSelection);

//Score Test
console.log(playerScore);
console.log(computerScore);
