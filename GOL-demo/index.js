const unitLength = 20;
let boxColor = 125;
const strokeColor = 50;
let columns; /* To be determined by window width */
let rows; /* To be determined by window height */
let currentBoard;
let nextBoard;
let rectX = 0;
let fr = 30; //starting FPS
let clr;
let flag = false;
let speed = 50;
let aNeihbors = 2;
let bNeighbors = 3;
let cNeighbors = 3;

// let c = color(255, 204, 0)
// var ctx2 = document.getElementById("canvas2").getContext("2d");
// let slider;

document.querySelector(".btnbtn-dark").addEventListener("click", function () {
  document.getElementById("b1").innerHTML = "<div></div>";
  flag = true;
});

function setup() {
  /* Set the canvas to be under the element #canvas*/
  frameRate(fr);
  const canvas = createCanvas(980, 800);
  canvas.parent(document.querySelector("#canvas"));

  /*Calculate the number of columns and rows */
  columns = floor(980 / unitLength);
  rows = floor(800 / unitLength);

  /*Making both currentBoard and nextBoard 2-dimensional matrix that has (columns * rows) boxes. */
  currentBoard = [];
  nextBoard = [];
  for (let i = 0; i < columns; i++) {
    currentBoard[i] = [];
    nextBoard[i] = [];
  }
  // Now both currentBoard and nextBoard are array of array of undefined values.
  init(); // Set the initial values of the currentBoard and nextBoard
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

/**
 * Initialize/reset the board state
 */
function init() {
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      currentBoard[i][j] = 0;
      nextBoard[i][j] = 0;
    }
  }
}

function draw() {
  frameRate(speed);
  background(255);
  generate();
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      if (currentBoard[i][j] == 1) {
        fill(boxColor);
        // fill(244, 40, 50);
      } else {
        fill(225);
      }
      stroke(strokeColor);
      rect(i * unitLength, j * unitLength, unitLength, unitLength);
    }
  }
}

function generate() {
  //Loop over every single box on the board
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      // Count all living members in the Moore neighborhood(8 boxes surrounding)
      let neighbors = 0;
      for (let i of [-1, 0, 1]) {
        for (let j of [-1, 0, 1]) {
          if (i == 0 && j == 0) {
            // the cell itself is not its own neighbor
            continue;
          }
          // The modulo operator is crucial for wrapping on the edge
          neighbors +=
            currentBoard[(x + i + columns) % columns][(y + j + rows) % rows];
        }
      }

      // Rules of Life
      if (currentBoard[x][y] == 1 && neighbors < aNeihbors) {
        // Die of Loneliness
        nextBoard[x][y] = 0;
      } else if (currentBoard[x][y] == 1 && neighbors > bNeighbors) {
        // Die of Overpopulation
        nextBoard[x][y] = 0;
      } else if (currentBoard[x][y] == 0 && neighbors == cNeighbors) {
        // New life due to Reproduction
        nextBoard[x][y] = 1;
      } else {
        // Stasis
        nextBoard[x][y] = currentBoard[x][y];
      }
    }
  }

  // Swap the nextBoard to be the current Board
  [currentBoard, nextBoard] = [nextBoard, currentBoard];
}

// function generate2() {
//   if (generate() =1) return (generate() = 0);
//   //Loop over every single box on the board
//   for (let x = 0; x < columns; x++) {
//     for (let y = 0; y < rows; y++) {
//       // Count all living members in the Moore neighborhood(8 boxes surrounding)
//       let neighbors = 0;
//       for (let i of [-1, 0, 1]) {
//         for (let j of [-1, 0, 1]) {
//           if (i == 0 && j == 0) {
//             // the cell itself is not its own neighbor
//             continue;
//           }
//           // The modulo operator is crucial for wrapping on the edge
//           neighbors +=
//             currentBoard[(x + i + columns) % columns][(y + j + rows) % rows];
//         }
//       }

//       // Rules of Life
//       if (currentBoard[x][y] == 2 && neighbors < 4) {
//         // Die of Loneliness
//         nextBoard[x][y] = 0;
//       } else if (currentBoard[x][y] == 1 && neighbors > 2) {
//         // Die of Overpopulation
//         nextBoard[x][y] = 0;
//       } else if (currentBoard[x][y] == 0 && neighbors == 3) {
//         // New life due to Reproduction
//         nextBoard[x][y] = 1;
//       } else {
//         // Stasis
//         nextBoard[x][y] = currentBoard[x][y];
//       }
//     }
//   }

//   // Swap the nextBoard to be the current Board
//   [currentBoard, nextBoard] = [nextBoard, currentBoard];
// }

// function windowResized() {
//     resizeCanvas(windowWidth, windowHeight);
// }

/**
 * When mouse is dragged
 */
function mouseDragged() {
  /**
   * If the mouse coordinate is outside the board
   */
  if (flag) {
    if (mouseX > unitLength * columns || mouseY > unitLength * rows) {
      return;
    }
    const x = Math.floor(mouseX / unitLength);
    const y = Math.floor(mouseY / unitLength);
    currentBoard[x][y] = 1;
    // fill(244, 40, 50);
    fill(boxColor);
    stroke(strokeColor);
    rect(x * unitLength, y * unitLength, unitLength, unitLength);
  }
}

/**
 * When mouse is pressed
 */
function mousePressed() {
  if (flag) {
    noLoop();
    mouseDragged();
  }
}

/**
 * When mouse is released
 */
function mouseReleased() {
  if (flag) noLoop();
}

// let slider;
// function setup() {
//   canvas.parent(document.querySelector("#canvas2"));
//   slider = createSlider(0, 255, 100);
//   slider.position(10, 10);
//   slider.style('width', '80px');
// }

// function draw() {
//   let val = slider.value();
//   background(val);
//   canvas.parent(document.querySelector("#canvas2"));
// }

// document.querySelector("#slider") =

// document.querySelector("#slider").addEventListener("mousedown", function(e){
//   toggleButton.style.left =
// }

document.querySelector("#myRange").addEventListener("mousemove", function () {
  speed = parseInt(this.value);
});

document.querySelector("#reset-game").addEventListener("click", function () {
  init();
  draw();
  boxColor = 125;
});

document.querySelector("#start-game").addEventListener("click", function () {
  loop();
  makeProgress();
  // if (querySelector("#reset-game") = true) noLoop();
});

document.querySelector("#pause").addEventListener("click", function () {
  noLoop();
});

// document.querySelector("#play").addEventListener("click", function () {
//   loop()
// });

document.querySelector("#redButton").addEventListener("click", function () {
  boxColor = color(1, 242, 1);
});

document.querySelector("#blueButton").addEventListener("click", function () {
  boxColor = color(38, 167, 251);
});

document.querySelector("#yellowButton").addEventListener("click", function () {
  boxColor = color(241, 201, 3);
});

document.querySelector("#purpleButton").addEventListener("click", function () {
  boxColor = color(221, 23, 136);
});

document.querySelector("#newRules").addEventListener("click", function () {
  aNeihbors = 1;
  bNeighbors = 3;
  cNeighbors = 3;
});

document.querySelector("#oldRules").addEventListener("click", function () {
  aNeihbors = 2;
  bNeighbors = 3;
  cNeighbors = 3;
});
