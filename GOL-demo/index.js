const unitLength = 20;
const boxColor = 150;
const strokeColor = 50;
let columns; /* To be determined by window width */
let rows; /* To be determined by window height */
let currentBoard;
let nextBoard;
let rectX = 0;
let fr = 30; //starting FPS
let clr;
let flag = false;


document.querySelector(".btnbtn-dark").addEventListener("click", function () {
  document.getElementById("b1").innerHTML = "<div></div>";
  flag = true;
});

function setup() {
  /* Set the canvas to be under the element #canvas*/
  frameRate(fr);
  const canvas = createCanvas(1000, 1000);
  canvas.parent(document.querySelector("#canvas"));

  /*Calculate the number of columns and rows */
  columns = floor(1000 / unitLength);
  rows = floor(1000 / unitLength);

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
  background(255);
  generate();
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      if (currentBoard[i][j] == 1) {
        fill(boxColor);
      } else {
        fill(100);
      }
      stroke(strokeColor);
      rect(i * unitLength, j * unitLength, unitLength, unitLength);
    }
  }
}

// function pattern1() { for (let i =15, let j =12)
// }

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
      if (currentBoard[x][y] == 1 && neighbors < 2) {
        // Die of Loneliness
        nextBoard[x][y] = 0;
      } else if (currentBoard[x][y] == 1 && neighbors > 3) {
        // Die of Overpopulation
        nextBoard[x][y] = 0;
      } else if (currentBoard[x][y] == 0 && neighbors == 3) {
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
  if(flag){
    if (mouseX > unitLength * columns || mouseY > unitLength * rows) {
      return;
    }
    const x = Math.floor(mouseX / unitLength);
    const y = Math.floor(mouseY / unitLength);
    currentBoard[x][y] = 1;
    fill(boxColor);
    stroke(strokeColor);
    rect(x * unitLength, y * unitLength, unitLength, unitLength);
  }

}

/**
 * When mouse is pressed
 */
function mousePressed() {
  if(flag){
    noLoop();
    mouseDragged();
  }
}

/**
 * When mouse is released
 */
function mouseReleased() {
  if(flag)
  noLoop();
}



document.querySelector("#reset-game").addEventListener("click", function () {
  init();
  draw();
});
document.querySelector("#start-game").addEventListener("click", function () {
  loop(); if(querySelector("#reset-game") =true ) noLoop();
});

  document.querySelector("#pause").addEventListener("click", function () {
    noLoop(); 
  });

  document.querySelector("#play").addEventListener("click", function () {
    loop()
  });

  document.querySelector("#pattern1").addEventListener("click", function () {
  pattern1()
  });



  
  // https://conwaylife.appspot.com/library
  // https://www.samcodes.co.uk/project/game-of-life/
  // https://medium.com/@ianschum/chromacon-a-highly-interactive-conways-game-of-life-built-in-javascript-627153f459ec