// Sans Boss fight from Undertale
// Your Name
// Date
//
// Extra for Experts:
// search bad time simulator on google and play the game so you know what I'm I trying to clone here

let state = "starting screen";
let modes = ["normal", "practice", "single attack", "endless"];
let mode = 0;

let player = {
  x: 0,
  y: 0,
  dx: 1,
  dy: 1,
};

function preload() {
  player = loadImage("heart.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(100);
  if (state === "starting screen"){
    drawStartScreen();
  }
}

function drawStartScreen(){
  let titleHeight = 0.25;
  let titleWidth = 0.6;
  let modeWidth = 0.1;
  let modeHeightDifference = 0.1;
  fill("white");
  textAlign(CENTER,CENTER);
  textSize(1);
  for(let i = 0; textWidth("Sans Boss Fight from Undertale") < titleWidth * width; i++){
    textSize(i);
  }
  text("Sans Boss Fight from Undertale", width / 2, titleHeight * height);
  textSize(1);
  for(let i = 1; textWidth("Normal") < modeWidth * width; i++){
    textSize(i);
  }
  textAlign(LEFT,CENTER);
  text(modes[0], width / 2, (titleHeight + modeHeightDifference * 2) * height);
  text(modes[1], width / 2, (titleHeight + modeHeightDifference * 3) * height);
  text(modes[2], width / 2, (titleHeight + modeHeightDifference * 4) * height);
  text(modes[3], width / 2, (titleHeight + modeHeightDifference * 5) * height);

  let heartX = 0.45;
  if (mode === 0){
    imageMode(CENTER);
    image(player, heartX * width , (titleHeight + modeHeightDifference * 2) * height, player.width * 0.08, player.height * 0.08);
  }

  if (mode === 1){
    imageMode(CENTER);
    image(player, heartX * width , (titleHeight + modeHeightDifference * 3) * height, player.width * 0.08, player.height * 0.08);
  }
  
  if (mode === 2){
    imageMode(CENTER);
    image(player, heartX * width , (titleHeight + modeHeightDifference * 4) * height, player.width * 0.08, player.height * 0.08);
  }
  
  if (mode === 3){
    imageMode(CENTER);
    image(player, heartX * width , (titleHeight + modeHeightDifference * 5) * height, player.width * 0.08, player.height * 0.08);
  }
  
}

function keyTyped(){
  if (key === "s" && state === "starting screen"){
    mode++;
  }
  if (key === "w" && state === "starting screen"){
    mode += modes.length;
    mode--;
  }
  if (key === " " && state === "starting screen"){
    state = modes[mode];
  } 
  mode = mode % modes.length;
}
// let x;
// let y;
// let dx = 2;
// let dy = 2;
// let mario;
// let scalar = 1.0;

// function preload() {
//   mario = loadImage("mario.png");
// }

// function setup() {
//   createCanvas(400, 400);
  
//   x = width/2;
//   y = height/2;
// }

// function draw() {
//   background(220);
  
//   moveBall();
  
//   //display circle
//   // circle(x, y, 25);
  
//   //display mario
//   image(mario, x, y, mario.width * scalar, mario.height * scalar);
// }

// function mouseWheel(event) {
//   // console.log(event.delta);
//   if (event.delta < 0) {
//     console.log("make it bigger");
//     scalar *= 1.1;
//   }
//   else {
//     console.log("make it smaller");
//     scalar *= 0.9;
//   }
  
// }

// function moveBall() {
//   if (keyIsDown(87)) { //w
//     y -= dy;
//   }
//   if (keyIsDown(83)) { //s
//     y += dy;
//   }
//   if (keyIsDown(68)) { //d
//     x += dx;
//   }
//   if (keyIsDown(65)) { //a
//     x -= dx;
//   }
// }