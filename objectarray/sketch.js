// Sans Boss fight from Undertale
// Your Name
// Date
//
// Extra for Experts:
// search bad time simulator on google and play the game so you know what I'm I trying to clone here

let state = "starting screen";
let modes = ["normal", "practice", "single attack", "endless"];
let mode = 0;
let level = 0;
let bones = [];
let scaleOfPlayer;
let inttailizedAready = "no";

let currentPlatform;
let level1Platform;

let heart;
let player = {
  x: 0,
  y: 0,
  dx: 0.005,
  dy: 0.005,
};

function preload() {
  heart = loadImage("heart.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  scaleOfPlayer = 0.000045 * width;
  player.dx = player.dx * height;
  player.dy = player.dy * height;

  // level 1 platform
  let platform1={x: 0.5 * height,y: 0.5 * height,l: 0.26 * height,w: 0.01 * height};
  let platform2={x: 0.375 * height,y: 0.625 * height,l: 0.01 * height,w: 0.26 * height};
  let platform3={x: 0.5 * height,y: 0.75 * height,l: 0.26 * height,w: 0.01 * height};
  let platform4={x: 0.625 * height,y: 0.625 * height,l: 0.01 * height,w: 0.26 * height};
  // let platform1={x: 0.5,y: 0,l: 1,w: 0.025};
  // let platform2={x: 0,y: 0.5,l: 0.025,w: 1};
  // let platform3={x: 0.5,y: 1,l: 1,w: 0.025};
  // let platform4={x: 1,y: 0.5,l: 0.025,w: 1};
  level1Platform = [platform1,platform2,platform3,platform4];
  currentPlatform = level1Platform
}

function draw() {
  background(100);
  if (state === "starting screen"){
    drawStartScreen();
  }
  else{
    innit();
    displayBones();
    displayPlatorm();
    displayPlayer();
    movePlayer();
    // fill("white");
    // line(player.x, 0, player.x, height);
    // line(0, player.y, width, player.y);
    // circle(player.x, player.y, heart.width * scaleOfPlayer)
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
    image(heart, heartX * width , (titleHeight + modeHeightDifference * 2) * height, heart.width * scaleOfPlayer, heart.height * scaleOfPlayer);
  }

  if (mode === 1){
    imageMode(CENTER);
    image(heart, heartX * width , (titleHeight + modeHeightDifference * 3) * height, heart.width * scaleOfPlayer, heart.height * scaleOfPlayer);
  }
  
  if (mode === 2){
    imageMode(CENTER);
    image(heart, heartX * width , (titleHeight + modeHeightDifference * 4) * height, heart.width * scaleOfPlayer, heart.height * scaleOfPlayer);
  }
  
  if (mode === 3){
    imageMode(CENTER);
    image(heart, heartX * width , (titleHeight + modeHeightDifference * 5) * height, heart.width * scaleOfPlayer, heart.height * scaleOfPlayer);
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
    level++;
    scaleOfPlayer = 0.000045 * height
  } 
  mode = mode % modes.length;
}

function innit(){
  if(level === 1 && inttailizedAready == "no"){
    player.x = currentPlatform[2].x;
    player.y = currentPlatform[2].y - currentPlatform[0].w / 2 - heart.height * scaleOfPlayer / 2;
    inttailizedAready = "yes"
  }
}

function displayBones(){
  if (level === 1){
    let i;
  }
}

function displayPlatorm(){
  if (level === 1){
    currentPlatform = level1Platform
    for (let platform of currentPlatform){
      rectMode(CENTER);
      fill("white");
      noStroke();
      rect(platform.x, platform.y, platform.l, platform.w);
      rectMode(LEFT);
    }
  }
}

function displayPlayer(){
  image(heart, player.x, player.y, heart.width * scaleOfPlayer, heart.height * scaleOfPlayer);
}

function movePlayer() {
  if (keyIsDown(87)) {
    //w
    let move = true;
    for (let platform of currentPlatform) {
      if (
        player.y > platform.y &&
        platform.x + platform.l / 2 > player.x - (heart.width * scaleOfPlayer) / 2 &&
        platform.x - platform.l / 2 < player.x + (heart.width * scaleOfPlayer) / 2 &&
        player.y - (heart.height * scaleOfPlayer) / 2 - player.dy < platform.y + platform.w / 2
      ) {
        move = false;
        player.y = platform.y + platform.w / 2 + (heart.height * scaleOfPlayer) / 2;
      }
    }
    if (move) {
      player.y -= player.dy;
    }
  }
  if (keyIsDown(83)) {
    //s
    let move = true;
    for (let platform of currentPlatform) {
      if (
        player.y < platform.y &&
        platform.x + platform.l / 2 > player.x - (heart.width * scaleOfPlayer) / 2 &&
        platform.x - platform.l / 2 < player.x + (heart.width * scaleOfPlayer) / 2 &&
        player.y + (heart.height * scaleOfPlayer) / 2 + player.dy > platform.y - platform.w / 2
      ) {
        move = false;
        player.y = platform.y - platform.w / 2 - (heart.height * scaleOfPlayer) / 2;
      }
    }
    if (move) {
      player.y += player.dy;
    }
  }
  if (keyIsDown(68)) {
    //d
    let move = true;
    for (let platform of currentPlatform) {
      if (
        player.x < platform.x &&
        platform.y + platform.w / 2 > player.y - (heart.height * scaleOfPlayer) / 2 &&
        platform.y - platform.w / 2 < player.y + (heart.height * scaleOfPlayer) / 2 &&
        player.x + (heart.width * scaleOfPlayer) / 2 + player.dx > platform.x - platform.l / 2
      ) {
        move = false;
        player.x = platform.x - platform.l / 2 - (heart.width * scaleOfPlayer) / 2;
      }
    }
    if (move) {
      player.x += player.dx;
    }
  }
  if (keyIsDown(65)) {
    //a
    let move = true;
    for (let platform of currentPlatform) {
      if (
        player.x > platform.x &&
        platform.y + platform.w / 2 > player.y - (heart.height * scaleOfPlayer) / 2 &&
        platform.y - platform.w / 2 < player.y + (heart.height * scaleOfPlayer) / 2 &&
        player.x - (heart.width * scaleOfPlayer) / 2 - player.dx < platform.x + platform.l / 2
      ) {
        move = false;
        player.x = platform.x + platform.l / 2 + (heart.width * scaleOfPlayer) / 2;
      }
      // text(player.x < platform.x,50,50);
      // text(platform.y + platform.w / 2 < player.y - (heart.height * scaleOfPlayer) / 2,150,platform.y);
      // text(platform.y - platform.w / 2 > player.y + (heart.height * scaleOfPlayer),250,50);
      // text(player.x + (heart.width * scaleOfPlayer) / 2 + player.dx > platform.x - platform.l / 2,350,50);
    }
    if (move) {
      player.x -= player.dx;
    }
  }
}



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