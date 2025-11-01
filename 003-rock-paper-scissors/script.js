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

function playGame() {
  let playerScore = 0;
  let computerScore = 0;

  function playRound(playerChoice, computerChoice) {
    const beats = {
      rock: "scissors",
      paper: "rock",
      scissors: "paper",
    };
    if (playerChoice === computerChoice) console.log("It's a tie! Play Again!");
    else if (computerChoice === beats[playerChoice]) {
      console.log(`You win! ${playerChoice} wins ${computerChoice}`);
      playerScore += 1;
    } else {
      console.log(`You lose! ${computerChoice} wins ${playerChoice}`);
      computerScore += 1;
    }
  }

  let gameRound = 5;
  let counter = 1;
  do {
    const playerSelection = getPlayerChoice();
    const computerSelection = getComputerChoice();

    console.log(playerSelection);
    console.log(computerSelection);

    playRound(playerSelection, computerSelection);

    //Score Test
    console.log(playerScore);
    console.log(computerScore);

    counter++;
  } while (counter <= gameRound);
}

playGame();
