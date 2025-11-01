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

function adjustTieGameRound(count, round, pScore, compScore) {
  if (count === round && pScore === compScore) {
    return round + 1;
  } else return round;
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

    playRound(playerSelection, computerSelection);

    //Score Test
    console.log(playerScore, computerScore);

    //Check tie round
    gameRound = adjustTieGameRound(
      counter,
      gameRound,
      playerScore,
      computerScore
    );

    counter++;
  } while (counter <= gameRound);

  console.log(
    playerScore > computerScore
      ? "Congratulation! You win!"
      : "You lose! Better luck next time!"
  );
}

playGame();
