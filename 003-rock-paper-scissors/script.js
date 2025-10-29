//Rock Paper Scissors
function getComputerChoice() {
  const randVal = Math.round(Math.random() * 2);
  let choice = "";

  switch (randVal) {
    case 0:
      choice = "rock";
      break;
    case 1:
      choice = "paper";
      break;
    case 2:
      choice = "scissors";
      break;
  }
  return choice;
}

function getPlayerChoice() {
  const playerInput = prompt(
    "Hello Player! Input:\n1 - Rock\n2 - Paper\n3 - Scissors"
  );
  let choice = "";

  switch (playerInput) {
    case "1":
      choice = "rock";
      break;
    case "2":
      choice = "paper";
      break;
    case "3":
      choice = "scissors";
      break;
  }

  return choice;
}

let humanScore = 0;
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
          humanScore += 1;
        }
        break;
      case "paper":
        if (computerChoice === "scissors") {
          console.log("You lose! Scissors wins Paper!");
          computerScore += 1;
        } else {
          console.log("You win! Paper wins Rock!");
          humanScore += 1;
        }
        break;
      case "scissors":
        if (computerChoice === "rock") {
          console.log("You lose! Rock wins Scissors!");
          computerScore += 1;
        } else {
          console.log("You win! Scissors wins Paper!");
          humanScore += 1;
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
console.log(humanScore);
console.log(computerScore);
