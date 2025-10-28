//Rock Paper Scissors
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

alert(getPlayerChoice());
