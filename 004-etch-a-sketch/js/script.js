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
