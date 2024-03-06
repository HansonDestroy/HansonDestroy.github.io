let x;
let y;
let dx;
let dy;
let rad = 25;
let r;
let g;
let b;
let backg = "black";
let circleSquare = true;
function setup() {
  createCanvas(400, 400);
  x = width / 2;
  y = height / 2;
  dx = random(0, 10);
  dy = random(0, 10);
  changeColor();
  noStroke();
}

function draw() {
  background(backg);
  showInstructions();
  //display
  if (circleSquare) {
    drawCircle();
  }
  else {
    rect(mouseX, mouseY, 100, 50);
  }

  //edge
  bounce();

  //move
  x += dx;
  y += dy;
}

function drawCircle() {
  fill(r, g, b);
  circle(x, y, 2 * rad);
}

function bounce() {
  if (x > width - rad || x < rad) {
    dx = -dx;
    changeColor();
  } 
  if (y > height - rad || y < rad) {
    dy = -dy;
    changeColor();
  }
}

function changeColor() {
  r = random(0, 255);
  g = random(0, 255);
  b = random(0, 255);
}

function keyTyped() {
  if (key === " ") {
    dx = random(0, 10);
    dy = random(0, 10);
  }

  if (key === "c") {
    changeColor();
  }
  
  if (key === "w") {
    backg = "white";
  }

  if (key === "b") {
    backg = "black";
  }
}

function mousePressed() {
  if (keyIsDown(82)) {
    circleSquare = false;
  }
}

function showInstructions(){
  fill("white");
  textSize(42);
  text("click", 200, 200);
}
