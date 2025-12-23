const defGridDim = 16;

const bounds = {
  minGrid: 16,
  maxGrid: 100,
};

const msg = {
  INVALID_INPUT: "Error! Invalid Input!",
};

const gridContainer = document.querySelector(".container");

const gridCell = () => document.querySelectorAll(".cell");

function displayGridCell(arrOfCell) {
  arrOfCell.forEach((cell) => {
    gridContainer.append(cell);
  });
}

function createGrid(gridSize, cellSize) {
  const arrOfCell = [];

  for (let i = 1; i <= gridSize; i++) {
    const squareCell = document.createElement("div");
    squareCell.className = "cell";
    squareCell.style.flexBasis = `${cellSize}%`;

    arrOfCell.push(squareCell);
  }

  return arrOfCell;
}

const calcGridSize = (cellCountPerSide) =>
  (cellCountPerSide *= cellCountPerSide);

const calcSquareSize = (cellCountPerSide) => 100 / cellCountPerSide;

function startGrid(cellCountPerSide) {
  const gridSize = calcGridSize(cellCountPerSide);
  const squareCellSize = calcSquareSize(cellCountPerSide);
  const grid = createGrid(gridSize, squareCellSize);

  return grid;
}

function start(cellCountPerSide = defGridDim /* Default */) {
  const gridData = startGrid(cellCountPerSide);

  displayGridCell(gridData);
}

function tagGridCell(event) {
  if (!isPainting) return;

  if (event.target.matches(".cell")) {
    event.target.classList.add("cellHover");
  }
}

let isPainting = false;

gridContainer.addEventListener("mousedown", (event) => {
  event.preventDefault();

  isPainting = true;

  gridContainer.style.cursor = "crosshair";

  // Single Cell
  const firstCell = event.target;

  if (firstCell.matches(".cell")) {
    firstCell.classList.add("cellHover");
  }
  //

  gridContainer.addEventListener("mouseover", tagGridCell);
});

window.addEventListener("mouseup", () => {
  isPainting = false;
  gridContainer.removeEventListener("mouseover", tagGridCell);
  gridContainer.style.cursor = "default";
});

function clearGrid() {
  gridCell()?.forEach((cell) => {
    cell.classList.remove("cellHover");
  });
}

function changeGrid() {
  while (true) {
    const input = prompt(
      "Input new grid num (Min: 16, Max: 100)",
      bounds.minGrid
    );

    if (input === null) return;

    const trimmed = input.trim();

    if (trimmed === "") {
      alert(msg.INVALID_INPUT);
      continue;
    }

    const num = Number(trimmed);

    if (!Number.isFinite(num)) {
      alert(msg.INVALID_INPUT);
      continue;
    }

    if (num < bounds.minGrid || num > bounds.maxGrid) {
      alert(msg.INVALID_INPUT);
      continue;
    }

    gridCell()?.forEach((cell) => cell.remove());

    start(num);

    return;
  }
}

const clearGridBtn = document.querySelector(".clear-grid");
clearGridBtn.addEventListener("click", clearGrid);

const changeGridBtn = document.querySelector(".change-grid");
changeGridBtn.addEventListener("click", changeGrid);

start();
