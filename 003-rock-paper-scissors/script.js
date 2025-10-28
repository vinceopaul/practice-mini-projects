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

console.log("player:", getPlayerChoice());
console.log("comp:", getComputerChoice());
