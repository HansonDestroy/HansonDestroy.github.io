// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
// I programed the logic on which hand is better according to the rules
// I made it pretty optimal speedwise eventhough there is room to improve (i ran out of time)
// adjust to the size of the window and easily customizable
//

// note to myslef: optimization possiblities

let suit = ["s", "c", "d", "h"];
let deck = [];
let computer = [];
let tempComputer = [];
let computerCount = 0;
let JP = [];
let tempJP = [];
let JPCount = 0;
let communityCards = [];
let tempcommunityCards = [];
let tieCount = 0;
let removeCards = [];
let simulationNumber = 0;
let selectedPlace = "";
let state = "start screen";
function setup() {
  createCanvas(windowWidth, windowHeight);
} function draw() {
  if (state === "start screen") {
    background(0);
    showInstructions();
  }
  if (state === "calculator") {
    displayCards();
    tempComputer = structuredClone(computer);
    tempJP = structuredClone(JP);
    tempcommunityCards = structuredClone(communityCards);
    for (let simulation = 0; simulation < simulationNumber; simulation++) {
      dealHand();
      winner();
      computer = structuredClone(tempComputer);
      JP = structuredClone(tempJP);
      communityCards = structuredClone(tempcommunityCards);
    }
    fill("red");
    text(
      floor(10000 * JPCount / 100 / (JPCount + computerCount + tieCount)) +
        "% jp win",
      100,
      200
    );
    text(
      floor(10000 * computerCount / 100 / (JPCount + computerCount + tieCount)) +
        "% computer win",
      300,
      200
    );
    text(
      floor(10000 * tieCount / 100 / (JPCount + computerCount + tieCount)) +
        "% tie (chop)",
      600,
      200
    );
    text(JPCount + "times", 100, 250);
    text(computerCount + "times", 300, 250);
    text(tieCount + "times", 600, 250);
  }
} function winner() {
  let JPBest = concat(JP, communityCards);
  JPBest = combination(JPBest);
  let computerBest = concat(computer, communityCards);
  computerBest = combination(computerBest);

  let JPValue = cardValue(JPBest);
  let computerValue = cardValue(computerBest);

  if (JPValue > computerValue) {
    // JPCount++;
  }
  else if (JPValue < computerValue) {
    // computerCount++;
  }
  else {
    let tieIndiactor = tieBreaker(JPValue, JPBest, computerBest);
    if (tieIndiactor === "array1") {
      JPCount++;
      // tieCount++
    }
    if (tieIndiactor === "array2") {
      computerCount++;
      // tieCount++
    }
    if (tieIndiactor === "chop") {
      tieCount++;
    }
  }
} function combination(Player) {
  let bestHand = [];
  let bestValue = 0;
  let newValue = 0;
  let cardValueArray = [];
  // combination of 7 cards chose 2
  for (let i = 0; i < 7; i++) {
    for (let j = i + 1; j < 7; j++) {
      // load every card other than i and j
      for (let newCard = 0; newCard < 7; newCard++) {
        if (newCard !== i && newCard !== j) {
          append(cardValueArray, Player[newCard]);
        }
      }
      // check if this is able to be the new best hand
      newValue = cardValue(cardValueArray);
      if (newValue > bestValue) {
        bestValue = newValue;
        bestHand = cardValueArray;
      }
      if (newValue === bestValue) {
        if (tieBreaker(bestValue, cardValueArray, bestHand) === "array1") {
          bestHand = cardValueArray;
        }
      }
      // cardValueArray ready to be loaded again
      cardValueArray = [];
    }
  }
  return bestHand;
} function cardValue(cardValueArray) {
  let redundantArray = redundantNumbers(cardValueArray);
  let straight = isStraight(cardValueArray);
  let flush = isFlush(cardValueArray);
  if (straight && flush) {
    if (isBroadway(cardValueArray)) {
      //("royal flush");
      return 10;
    }
    else {
      //("straight flush");
      return 9;
    }
  }
  else {
    if (redundantArray[4] === 4) {
      //("four of a kind");
      return 8;
    }
    if (redundantArray[0] === 2 && redundantArray[4] === 3) {
      //("full house");
      return 7;
    }
    if (flush) {
      //("flush");
      return 6;
    }
    if (straight) {
      //("straight");
      return 5;
    }
    if (redundantArray[4] === 3) {
      //("three of a kind");
      return 4;
    }
    if (redundantArray[2] === 2 ) {
      //("two pair");
      return 3;
    }
    if (redundantArray[4] === 2) {
      //("pair");
      return 2;
    }
    
    //("high card");
    return 1;
    
  }
} function tieBreaker(value, array1, array2) {
  let array1Number = sort(getNumber(array1));
  let array2Number = sort(getNumber(array2));
  let array1Redundant = checkRedundancy(array1Number);
  let array2Redundant = checkRedundancy(array2Number);
  if (value === 1 || value === 6) {
    if (array1Number[0] === 1 && array2Number[0] !== 1) {
      return "array1";
    }
    if (array1Number[0] !== 1 && array2Number[0] === 1) {
      return "array2";
    }
    for (let i = 4; i > -1; i--) {
      if (array1Number[i] > array2Number[i]) {
        return "array1";
      }
      if (array1Number[i] < array2Number[i]) {
        return "array2";
      }
    }
    return "chop";
  }
  if (value === 2) {
    let array1Pair = 0;
    let array2Pair = 0;

    for (let i = 0; i < 5; i++) {
      if (array1Redundant[i] === 2) {
        array1Pair = array1Number[i];
      }
      if (array2Redundant[i] === 2) {
        array2Pair = array2Number[i];
      }
    }

    if (array1Pair === 1 && array2Pair !== 1) {
      return "array1";
    }
    if (array1Pair !== 1 && array2Pair === 1) {
      return "array2";
    }
    if (array1Pair > array2Pair) {
      return "array1";
    }
    if (array1Pair < array2Pair) {
      return "array2";
    }
    if (array1Number[0] === 1 && array2Number[0] !== 1) {
      return "array1";
    }
    if (array1Number[0] !== 1 && array2Number[0] === 1) {
      return "array2";
    }
    for (let i = 4; i > -1; i--) {

      if (array1Number[i] > array2Number[i]) {
        return "array1";
      }
      if (array1Number[i] < array2Number[i]) {
        return "array2";
      }
    }

    return "chop";
  }
  if (value === 3) {
    let array1Kicker = 0;
    let array2Kicker = 0;
    let array1HigPair = 0;
    let array1LowPair = 14;
    let array2HigPair = 0;
    let array2LowPair = 14;

    for (let i = 0; i < 5; i++) {
      if (array1Redundant[i] === 1) {
        array1Kicker = array1Number[i];
      }
      else {
        array1HigPair = maxi(array1HigPair, array1Number[i]);
        array1LowPair = mini(array1LowPair, array1Number[i]);
      }
      if (array2Redundant[i] === 1) {
        array2Kicker = array2Number[i];
      }
      else {
        array2HigPair = maxi(array2HigPair, array2Number[i]);
        array2LowPair = mini(array2LowPair, array2Number[i]);
      }
    }

    if (array1HigPair === 1 && array2HigPair !== 1) {
      return "array1";
    }
    else if (array1HigPair !== 1 && array2HigPair === 1) {
      return "array2";
    }
    else if (array1HigPair > array2HigPair) {
      return "array1";
    }
    else if (array1HigPair < array2HigPair) {
      return "array2";
    }
    else {
      if (array1LowPair === 1 && array2LowPair !== 1) {
        return "array1";
      }
      else if (array1LowPair !== 1 && array2LowPair === 1) {
        return "array2";
      }
      else if (array1LowPair > array2LowPair) {
        return "array1";
      }
      else if (array1LowPair < array2LowPair) {
        return "array2";
      }
      else {
        if (array1Kicker === 1 && array2Kicker !== 1) {
          return "array1";
        }
        else if (array1Kicker !== 1 && array2Kicker === 1) {
          return "array2";
        }
        else if (array1Kicker > array2Kicker) {
          return "array1";
        }
        else if (array1Kicker < array2Kicker) {
          return "array2";
        }
        else {
          return "chop";
        }
      }
    }
  }
  if (value === 4) {
    let array1Trips = 0;
    let array2Trips = 0;
    let array1HighKicker = 0;
    let array1LowKicker = 14;
    let array2HighKicker = 0;
    let array2LowKicker = 14;

    for (let i = 0; i < 5; i++) {
      if (array1Redundant[i] === 3) {
        array1Trips = array1Number[i];
      }
      else {
        array1HighKicker = maxi(array1HighKicker, array1Number[i]);
        array1LowKicker = mini(array1LowKicker, array1Number[i]);
      }
      if (array2Redundant[i] === 3) {
        array2Trips = array2Number[i];
      }
      else {
        array2HighKicker = maxi(array2HighKicker, array2Number[i]);
        array2LowKicker = mini(array2LowKicker, array2Number[i]);
      }
    }

    if (array1Trips === 1 && array2Trips !== 1) {
      return "array1";
    }
    else if (array1Trips !== 1 && array2Trips === 1) {
      return "array2";
    }
    else if (array1Trips > array2Trips) {
      return "array1";
    }
    else if (array1Trips < array2Trips) {
      return "array2";
    }
    else {
      if (array1HighKicker === 1 && array2HighKicker !== 1) {
        return "array1";
      }
      else if (array1HighKicker !== 1 && array2HighKicker === 1) {
        return "array2";
      }
      else if (array1HighKicker > array2HighKicker) {
        return "array1";
      }
      else if (array1HighKicker < array2HighKicker) {
        return "array2";
      }
      else {
        if (array1LowKicker === 1 && array2LowKicker !== 1) {
          return "array1";
        }
        else if (array1LowKicker !== 1 && array2LowKicker === 1) {
          return "array2";
        }
        else if (array1LowKicker > array2LowKicker) {
          return "array1";
        }
        else if (array1LowKicker < array2LowKicker) {
          return "array2";
        }
        else {
          return "chop";
        }
      }
    }
  }
  if (value === 5 || value === 9) {
    if (array1Number[0] === 1 && array1Number[0] === 10) {
      return "array1";
    }
    else if (array2Number[0] === 1 && array2Number[0] === 10) {
      return "array2";
    }
    else if (array1Number[0] > array2Number[0]) {
      return "array1";
    }
    else if (array1Number[0] < array2Number[0]) {
      return "array2";
    }
    else {
      return "chop";
    }
  }
  if (value === 7) {
    let array1Full = 0;
    let array1Of = 0;
    let array2Full = 0;
    let array2Of = 0;

    for (let i = 0; i < 5; i++) {
      if (array1Redundant[i] === 2) {
        array1Of = array1Number[i];
      }
      else {
        array1Full = array1Number[i];
      }
      if (array2Redundant[i] === 2) {
        array2Of = array2Number[i];
      }
      else {
        array2Full = array2Number[i];
      }
    }

    if (array1Full === array2Full) {
      if (array1Of === array2Of) {
        return "chop";
      }
      else if (array1Of === 1) {
        return "array1";
      }
      else if (array2Of === 1) {
        return "array2";
      }
      else if (array1Of > array2Of) {
        return "array1";
      }
      else {
        return "array2";
      }
    }
    if (array1Full === 1) {
      return "array1";
    }
    else if (array2Full === 1) {
      return "array2";
    }
    else if (array1Full > array2Full) {
      return "array1";
    }
    else {
      return "array2";
    }
  }
  if (value === 8) {
    let array1Quad = 0;
    let array1Kiker = 0;
    let array2Quad = 0;
    let array2Kiker = 0;

    for (let i = 0; i < 5; i++) {
      if (array1Redundant[i] === 1) {
        array1Kiker = array1Number[i];
      }
      else {
        array1Quad = array1Number[i];
      }
      if (array2Redundant[i] === 1) {
        array2Kiker = array2Number[i];
      }
      else {
        array2Quad = array2Number[i];
      }
    }

    if (array1Quad === array2Quad) {
      if (array1Kiker === array2Kiker) {
        return "chop";
      }
      else if (array1Kiker === 1) {
        return "array1";
      }
      else if (array2Kiker === 1) {
        return "array2";
      }
      else if (array1Kiker > array2Kiker) {
        return "array1";
      }
      else {
        return "array2";
      }
    }
    if (array1Quad === 1) {
      return "array1";
    }
    else if (array2Quad === 1) {
      return "array2";
    }
    else if (array1Quad > array2Quad) {
      return "array1";
    }
    else {
      return "array2";
    }
  }
  if (value === 10) {
    return "chop";
  }
  return "chop";
} function isStraight(array) {
  // get the numbers
  let straightArray = getNumber(array);
  // sort the numbers
  straightArray = sort(straightArray);
  // check if the numbers are connected
  if (
    straightArray[0] + 4 === straightArray[4] &&
    straightArray[1] + 3 === straightArray[4] &&
    straightArray[2] + 2 === straightArray[4] &&
    straightArray[3] + 1 === straightArray[4]
  ) {
    // normal straight
    return true;
  }
  if (isBroadway(array)) {
    // broadway straight
    return true;
  }
  return false;
} function isFlush(array) {
  if (
    array[0][0] === array[1][0] &&
    array[0][0] === array[2][0] &&
    array[0][0] === array[3][0] &&
    array[0][0] === array[4][0]
  ) {
    return true;
  }
  return false;
} function isBroadway(array) {
  // get the numbers
  let broadwayArray = getNumber(array);
  // sort the numbers
  broadwayArray = sort(broadwayArray);
  if (broadwayArray[0] === 1 && broadwayArray[1] === 10) {
    return true;
  }
  return false;
} function redundantNumbers(array) {
  let redundantArray = getNumber(array);
  redundantArray = checkRedundancy(redundantArray);
  redundantArray = sort(redundantArray);
  return redundantArray;
} function checkRedundancy(array) {
  let redundantArray = [0, 0, 0, 0, 0];
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (array[i] === array[j]) {
        redundantArray[i]++;
      }
    }
  }
  return redundantArray;
} function getNumber(array) {
  array = [
    parseInt(array[0].slice(1)),
    parseInt(array[1].slice(1)),
    parseInt(array[2].slice(1)),
    parseInt(array[3].slice(1)),
    parseInt(array[4].slice(1)),
  ];
  return array;
} function dealCard() {
  let firstCard = deck[deck.length - 1];
  deck = shorten(deck);
  return firstCard;
} function dealHand() {
  // reset hands and deck
  deck = [];
  // get a full deck of cards
  for (let suits = 0; suits < 4; suits++) {
    for (let number = 1; number < 14; number++) {
      append(deck, suit[suits] + str(number));
      // remove cards if it is aready drawn
      for (let remove = 0; remove < removeCards.length; remove++) {
        if (removeCards[remove] === suit[suits] + str(number)) {
          shorten(deck);
        }
      }
    }
  }

  // shuffle
  deck = shuffle(deck);
  // deal wholecards
  for (let i = 0; i < 5; i++) {
    if (computer.length < 2) {
      append(computer, dealCard());
    }
    if (JP.length < 2) {
      append(JP, dealCard());
    }
    // deal communityCards
    if (communityCards.length < 5) {
      append(communityCards, dealCard());
    }
  }
} function maxi(a, b) {
  if (a > b) {
    return a;
  }
  if (b > a) {
    return b;
  }
  else {
    return a;
  }
} function mini(a, b) {
  if (a > b) {
    return b;
  }
  if (b > a) {
    return a;
  }
  else {
    return a;
  }
}

let generateCardsArray = [];
function generateVisualCards() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 13; j++) {
      append(generateCardsArray, [
        j,
        i,
        j / 13 * width,
        (0.5 + i / 8) * height,
        1 / 13 * width,
        1 / 8 * height,
      ]);
    }
  }
} function displayCards() {
  background(255);
  generateVisualCards();
  for (let i = 0; i < 52; i++) {
    fill("white");
    rect(
      generateCardsArray[i][2],
      generateCardsArray[i][3],
      generateCardsArray[i][4],
      generateCardsArray[i][5]
    );
    fill("black");
    text(
      suit[generateCardsArray[i][1]] + (generateCardsArray[i][0] + 1),
      generateCardsArray[i][2] + 0.5 * generateCardsArray[i][4],
      generateCardsArray[i][3] + 0.5 * generateCardsArray[i][5]
    );
  }
  text(JP[0] + JP[1], 100, 50);
  text(computer[0] + computer[1], 250, 50);
  text(
    communityCards[0] +
      communityCards[1] +
      communityCards[2] +
      communityCards[3] +
      communityCards[4],
    500,
    50
  );
  //
  if (selectedPlace === "JP") {
    fill("green");
  }
  else {
    fill("grey");
  }
  rect(0, 100, 150, 50);
  fill("white");
  text("select JP", 75, 125);
  //
  if (selectedPlace === "computer") {
    fill("green");
  }
  else {
    fill("grey");
  }
  rect(150, 100, 250, 50);
  fill("white");
  text("select computer", 275, 125);
  //
  if (selectedPlace === "communityCards") {
    fill("green");
  }
  else {
    fill("grey");
  }
  rect(450, 100, 350, 50);
  fill("white");
  text("select community cards", 625, 125);
} 

function mousePressed() {
  if (
    state === "start screen" &&
    mouseX / width > playBox[0] &&
    mouseX / width < playBox[0] + playBox[2] &&
    mouseY / height > playBox[1] &&
    mouseY / height < playBox[3] + playBox[1]
  ) {
    state = "calculator";
    background(255);
    textSize(25);
  }
  if (
    state === "start screen" &&
    mouseX / width > instructionBox[0] &&
    mouseX / width < instructionBox[0] + instructionBox[2] &&
    mouseY / height > instructionBox[1] &&
    mouseY / height < instructionBox[3] + instructionBox[1]
  ) {
    print("hi");
    background(155);
    textSize(15);
    text(
      "This is a texas poker calculator. exact clone of https://www.pokernews.com/poker-tools/poker-odds-calculator.htm)",
      width / 2,
      height / 2
    );
    text(
      "click with your mouse in the select JP, select computer, or select community cards box then click the cards on the bottom to add them to the hands",
      width / 2,
      height / 2 - 50
    );
    text(
      "Type a to simulate 10 hands at the same time. b for 100 c for 1000 d for 10000 e for 100000 f for 1000000",
      width / 2,
      height / 2 - 100
    );
    text(
      "s h c h stands for spades hearts clubs hearts",
      width / 2,
      height / 2 - 150
    );
    state = "instruction";
  }
  if (state === "calculator") {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 13; j++) {
        if (
          mouseX > j * width / 13 &&
          mouseX < (j + 1) * width / 13 &&
          mouseY > (4 + i) * height / 8 &&
          mouseY < (4 + i + 1) * height / 8
        ) {
          if (selectedPlace === "JP" && JP.length < 2) {
            append(JP, suit[i] + (j + 1));
            append(removeCards, suit[i] + (j + 1));
          }
          if (selectedPlace === "computer" && computer.length < 2) {
            append(computer, suit[i] + (j + 1));
            append(removeCards, suit[i] + (j + 1));
          }
          if (
            selectedPlace === "communityCards" &&
            communityCards.length < 5
          ) {
            append(communityCards, suit[i] + (j + 1));
            append(removeCards, suit[i] + (j + 1));
          }
        }
      }
    }
    if (mouseX > 0 && mouseX < 150 && mouseY > 100 && mouseY < 150) {
      selectedPlace = "JP";
    }
    if (mouseX > 150 && mouseX < 400 && mouseY > 100 && mouseY < 150) {
      selectedPlace = "computer";
    }
    if (mouseX > 450 && mouseX < 800 && mouseY > 100 && mouseY < 150) {
      selectedPlace = "communityCards";
    }
  }
}
function keyTyped() {
  if (key === "a") {
    simulationNumber = 10;
  }
  if (key === "b") {
    simulationNumber = 100;
  }
  if (key === "c") {
    simulationNumber = 1000;
  }
  if (key === "d") {
    simulationNumber = 10000;
  }
  if (key === "e") {
    simulationNumber = 100000;
  }
  if (key === "f") {
    simulationNumber = 1;
  }
}

let TitleBox = [0.1, 0.2, 0.75, 0.25];
let instructionBox = [0.1, 0.6, 0.25, 0.25];
let playBox = [0.6, 0.6, 0.25, 0.25];
function showInstructions() {
  let titleSize = 0;
  fill("white");
  for (let i = 0; i < 100; i++) {
    textSize(i);
    textAlign(CENTER, CENTER);
    titleSize = textWidth("Texas Hold'em Calculator");
    if (titleSize * 1.35 / width > TitleBox[2]) {
      break;
    }
  }
  fill("white");
  rect(
    TitleBox[0] * width,
    TitleBox[1] * height,
    TitleBox[2] * width,
    TitleBox[3] * height
  );
  fill("black");
  text(
    "Texas Hold'em Calculator",
    TitleBox[0] * width + TitleBox[2] * width / 2,
    TitleBox[1] * height + TitleBox[3] * height / 2
  );

  let InstructionSize = 0;
  fill("white");
  for (let i = 0; i < 100; i++) {
    textSize(i);
    textAlign(CENTER, CENTER);
    InstructionSize = textWidth("Instruction");
    if (InstructionSize * 1.35 / width > instructionBox[2]) {
      break;
    }
  }
  fill("white");
  rect(
    instructionBox[0] * width,
    instructionBox[1] * height,
    instructionBox[2] * width,
    instructionBox[3] * height
  );
  fill("black");
  text(
    "Instruction",
    instructionBox[0] * width + instructionBox[2] * width / 2,
    instructionBox[1] * height + instructionBox[3] * height / 2
  );

  let playSize = 0;
  fill("white");
  for (let i = 0; i < 100; i++) {
    textSize(i);
    textAlign(CENTER, CENTER);
    playSize = textWidth("Play");
    if (playSize * 1.35 / width > playBox[2]) {
      break;
    }
  }
  fill("white");
  rect(
    playBox[0] * width,
    playBox[1] * height,
    playBox[2] * width,
    playBox[3] * height
  );
  fill("black");
  text(
    "Play",
    playBox[0] * width + playBox[2] * width / 2,
    playBox[1] * height + playBox[3] * height / 2
  );
}
