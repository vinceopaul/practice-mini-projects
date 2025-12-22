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

function start(cellCountPerSide = 50 /* Default */) {
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

const cells = document.querySelectorAll(".cell");
console.log(cells);

let isPainting = false;

gridContainer.addEventListener("mousedown", (event) => {
  event.preventDefault();

  isPainting = true;

  const firstCell = event.target;
  if (firstCell.classList.contains("cell")) {
    tagGridCell({ currentTarget: firstCell });
  }

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
  cells.forEach((cell) => {
    cell.classList.remove("cellHover");
  });
}

const clearGridBtn = document.querySelector(".clear-grid");
clearGridBtn.addEventListener("click", clearGrid);
