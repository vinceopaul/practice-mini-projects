const defGridDim = 16;

const bounds = {
  minGrid: 16,
  maxGrid: 100,
};

const msg = {
  INVALID_INPUT: "Error! Invalid Input!",
};

const randomizeRGBColor = (min = 1, max = 256) => {
  const [r, g, b] = Array.from({ length: 3 }, () =>
    Math.floor(Math.random() * (max - min) + min)
  );

  return {
    r,
    g,
    b,
  };
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

let randDrawColor = randomizeRGBColor();

function tagGridCell(event) {
  if (!isPainting) return;

  if (event.target.matches(".cell")) {
    event.target.classList.add("cellHover");
    event.target.style.backgroundColor = `rgb(${randDrawColor.r},${randDrawColor.g},${randDrawColor.b})`;
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
    firstCell.style.backgroundColor = `rgb(${randDrawColor.r},${randDrawColor.g},${randDrawColor.b})`;
  }
  //

  gridContainer.addEventListener("mouseover", tagGridCell);
});

window.addEventListener("mouseup", () => {
  isPainting = false;
  gridContainer.removeEventListener("mouseover", tagGridCell);
  gridContainer.style.cursor = "default";
  randDrawColor = randomizeRGBColor();
});

function clearGrid() {
  gridCell()?.forEach((cell) => {
    cell.classList.remove("cellHover");
    cell.style.backgroundColor = "";
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
