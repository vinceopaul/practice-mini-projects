const bounds = {
  minGrid: 16,
  maxGrid: 100,
};

const gridContainer = document.querySelector(".container");

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

function start(cellCountPerSide = 16 /* Default */) {
  const gridData = startGrid(cellCountPerSide);

  displayGridCell(gridData);
}

let cellCountPerSide;

start(cellCountPerSide);

function tagGridCell(event) {
  if (!isPainting) return;
  gridContainer.style.cursor = "crosshair";

  const cell = event.currentTarget;
  cell.classList.add("cellHover");
}

let isPainting = false;

gridContainer.addEventListener("mousedown", (event) => {
  event.preventDefault();

  isPainting = true;

  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    if (!cell.classList.contains("cellHover")) {
      cell.addEventListener("mouseenter", tagGridCell, { once: true });
    }
  });
});

window.addEventListener("mouseup", () => {
  isPainting = false;
  gridContainer.style.cursor = "default";
});

function clearGrid() {
  document.querySelectorAll(".cell").forEach((cell) => {
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
      alert("Error: Invalid Input!");
      continue;
    }

    const num = Number(trimmed);

    if (!Number.isFinite(num)) {
      alert("Error: Invalid Input!");
      continue;
    }

    if (num < bounds.minGrid || bounds.maxGrid > 100) {
      alert("Error: Invalid Input!");
      continue;
    }

    document.querySelectorAll(".cell").forEach((cell) => cell.remove());
    start(num);

    return;
  }
}

const clearGridBtn = document.querySelector(".clear-grid");
clearGridBtn.addEventListener("click", clearGrid);

const changeGridBtn = document.querySelector(".change-grid");
changeGridBtn.addEventListener("click", changeGrid);
