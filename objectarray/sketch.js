// Sans Boss fight from Undertale
// Your Name
// Date
//
// Extra for Experts:
// search bad time simulator on google and play the game so you know what I'm I trying to clone here

let state = "starting screen";
let modes = ["normal","practice","single attack"];
let mode = modes[0];

let player = {
  x: 0,
  y: 0,
};


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
  let TitleHeight = 0.25;
  fill("white");
  textAlign(CENTER,CENTER);
  textSize(42);
  text("Sans Boss Fight from Undertale", width / 2, TitleHeight * height);
  // text("Sans Boss Fight from Undertale");
}