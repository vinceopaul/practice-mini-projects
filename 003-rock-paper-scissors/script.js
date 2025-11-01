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

const adjustTieGameRound = (count, round, pScore, compScore) =>
  count === round && pScore === compScore ? round + 1 : round;

function getWinningChoice(pChoice) {
  const beats = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
  };
  return beats[pChoice];
}

function playGame() {
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
