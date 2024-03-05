// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let suit = ["s", "c", "d", "h"];
let deck = [];
let computer = [];
let JP = [];
let communityCards = [];
function setup() {
  createCanvas(400, 400);
  for (i = 0; i < 10000; i++) {
    dealHand();
    winner();
  }
}
function draw() {}
function winner() {
  JP = concat(JP, communityCards);
  computer = concat(computer, communityCards);
  if (cardValue(combination(JP)) > 7 || cardValue(combination(computer)) > 7) {
    print(combination(JP), combination(computer));
  }
}
function combination(Player) {
  let value = 0;
  let bestHand = [];
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
      if (cardValue(cardValueArray) > value) {
        value = cardValue(cardValueArray);
        bestHand = cardValueArray;
      } else if (cardValue(cardValueArray) === value) {
        if (tieBreaker(value, cardValueArray, bestHand) === "array1")
          bestHand = cardValueArray;
      }
      // cardValueArray ready to be loaded again
      cardValueArray = [];
    }
  }
  return bestHand;
}
function cardValue(cardValueArray) {
  let value = 0;
  let redundantArray = redundantNumbers(cardValueArray);
  if (isStraight(cardValueArray) && isFlush(cardValueArray)) {
    if (isRoyalFlush(cardValueArray)) {
      //print("royal flush");
      value = 10;
    } else {
      //print("straight flush");
      value = 9;
    }
  } else {
    if (
      redundantArray[0] === 1 &&
      redundantArray[1] === 4 &&
      redundantArray[2] === 4 &&
      redundantArray[3] === 4 &&
      redundantArray[4] === 4
    ) {
      //print("four of a kind");
      value = 8;
    } else if (
      redundantArray[0] === 2 &&
      redundantArray[1] === 2 &&
      redundantArray[2] === 3 &&
      redundantArray[3] === 3 &&
      redundantArray[4] === 3
    ) {
      //print("full house");
      value = 7;
    } else if (isFlush(cardValueArray)) {
      //print("flush");
      value = 6;
    } else if (isStraight(cardValueArray)) {
      //print("straight");
      value = 5;
    } else if (
      redundantArray[0] === 1 &&
      redundantArray[1] === 1 &&
      redundantArray[2] === 3 &&
      redundantArray[3] === 3 &&
      redundantArray[4] === 3
    ) {
      //print("three of a kind");
      value = 4;
    } else if (
      redundantArray[0] === 1 &&
      redundantArray[1] === 2 &&
      redundantArray[2] === 2 &&
      redundantArray[3] === 2 &&
      redundantArray[4] === 2
    ) {
      //print("two pair");
      value = 3;
    } else if (
      redundantArray[0] === 1 &&
      redundantArray[1] === 1 &&
      redundantArray[2] === 1 &&
      redundantArray[3] === 2 &&
      redundantArray[4] === 2
    ) {
      //print("pair");
      value = 2;
    } else if (
      redundantArray[0] === 1 &&
      redundantArray[1] === 1 &&
      redundantArray[2] === 1 &&
      redundantArray[3] === 1 &&
      redundantArray[4] === 1
    ) {
      //print("high card");
      value = 1;
    }
  }
  return value;
}
function tieBreaker(value, array1, array2) {
  let array1Number = sort(getNumber(array1));
  let array2Number = sort(getNumber(array2));
  let array1Redundant = checkRedundancy(array1Number);
  let array2Redundant = checkRedundancy(array2Number);

  if (value === 10) {
    return "chop";
  } else if (value === 9 || 5) {
    if (array1Number[0] === 1 && array1Number[0] === 10) {
      return "array1";
    } else if (array2Number[0] === 1 && array2Number[0] === 10) {
      return "array2";
    } else if (array1Number[0] > array2Number[0]) {
      return "array1";
    } else if (array1Number[0] < array2Number[0]) {
      return "array2";
    } else {
      return "chop";
    }
  } else if (value === 8) {
    let array1Quad = 0;
    let array1Kiker = 0;
    let array2Quad = 0;
    let array2Kiker = 0;

    for (let i = 0; i < 5; i++) {
      if (array1Redundant[i] === 1) {
        array1Kiker = array1Number[i];
      } else {
        array1Quad = array1Number[i];
      }
      if (array2Redundant[i] === 1) {
        array2Kiker = array2Number[i];
      } else {
        array2Quad = array2Number[i];
      }
    }

    if (array1Quad === array2Quad)
      if (array1Kiker === array2Kiker) {
        return "chop";
      } else if (array1Kiker === 1) {
        return "array1";
      } else if (array2Kiker === 1) {
        return "array2";
      } else if (array1Kiker > array2Kiker) {
        return "array1";
      } else {
        return "array2";
      }
    else if (array1Quad === 1) {
      return "array1";
    } else if (array2Quad === 1) {
      return "array2";
    } else if (array1Quad > array2Quad) {
      return "array1";
    } else {
      return "array2";
    }
  } else if (value === 7) {
    let array1Full = 0;
    let array1Of = 0;
    let array2Full = 0;
    let array2Of = 0;

    for (let i = 0; i < 5; i++) {
      if (array1Redundant[i] === 2) {
        array1Of = array1Number[i];
      } else {
        array1Full = array1Number[i];
      }
      if (array2Redundant[i] === 2) {
        array2Of = array2Number[i];
      } else {
        array2Full = array2Number[i];
      }
    }

    if (array1Full === array2Full)
      if (array1Of === array2Of) {
        return "chop";
      } else if (array1Of === 1) {
        return "array1";
      } else if (array2Of === 1) {
        return "array2";
      } else if (array1Of > array2Of) {
        return "array1";
      } else {
        return "array2";
      }
    else if (array1Full === 1) {
      return "array1";
    } else if (array2Full === 1) {
      return "array2";
    } else if (array1Full > array2Full) {
      return "array1";
    } else {
      return "array2";
    }
  } else if (value === 6 || value === 1) {
    if (array1Number[0] === 1 && array2Number[0] !== 1) {
      return "array1";
    } else if (array1Number[0] !== 1 && array2Number[0] === 1) {
      return "array2";
    }
    for (let i = 4; i > -1; i--) {
      if (array1Number[i] > array2Number[i]) {
        return "array1";
      } else if (array1Number[i] < array2Number[i]) {
        return "array2";
      }
    }
    return "chop";
  } else if (value === 4){
    let array1Trips = 0;
    let array2Trips = 0;
    let array1HighKicker = 0;
    let array1LowKicker = 14;
    let array2HighKicker = 0;
    let array2LowKicker = 14;

    for (let i = 0; i < 5; i++) {
      if (array1Redundant[i] === 3) {
        array1Trips = array1Number[i];
      } else {
        array1HighKicker = max(array1HighKicker, array1Number[i]);
        array1LowKicker = min(array1LowKicker, array1Number[i]);
      }
      if (array2Redundant[i] === 3) {
        array2Trips = array2Number[i];
      } else {
        array2HighKicker = max(array2HighKicker, array2Number[i]);
        array2LowKicker = min(array2LowKicker, array2Number[i]);
      }
    }
  }
}
function isStraight(array) {
  // get the numbers
  let straightArray = getNumber(array);
  // sort the numbers
  straightArray = sort(straightArray);
  // check if the numbers are connected
  if (
    straightArray[4] === 13 &&
    straightArray[3] === 12 &&
    straightArray[2] === 11 &&
    straightArray[1] === 10 &&
    straightArray[0] === 1
  ) {
    // broadway straight
    return true;
  } else if (
    straightArray[0] + 4 === straightArray[4] &&
    straightArray[1] + 3 === straightArray[4] &&
    straightArray[2] + 2 === straightArray[4] &&
    straightArray[3] + 1 === straightArray[4]
  ) {
    // normal straight
    return true;
  }
  return false;
}
function isFlush(array) {
  if (
    array[0][0] === array[1][0] &&
    array[0][0] === array[2][0] &&
    array[0][0] === array[3][0] &&
    array[0][0] === array[4][0]
  ) {
    return true;
  }
  return false;
}
function isRoyalFlush(array) {
  // get the numbers
  royalArray = getNumber(array);
  // sort the numbers
  royalArray = sort(royalArray);
  if (royalArray[0] === 1 && royalArray[1] === 10) {
    return true;
  }
  return false;
}
function redundantNumbers(array) {
  let redundantArray = getNumber(array);
  redundantArray = checkRedundancy(redundantArray);
  redundantArray = sort(redundantArray);
  return redundantArray;
}
function checkRedundancy(array) {
  let redundantArray = [0, 0, 0, 0, 0];
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (array[i] === array[j]) {
        redundantArray[i]++;
      }
    }
  }
  return redundantArray;
}
function getNumber(array) {
  array = [
    parseInt(array[0].slice(1)),
    parseInt(array[1].slice(1)),
    parseInt(array[2].slice(1)),
    parseInt(array[3].slice(1)),
    parseInt(array[4].slice(1)),
  ];
  return array;
}
function dealCard() {
  let firstCard = deck[deck.length - 1];
  deck = shorten(deck);
  return firstCard;
}
function dealHand() {
  // reset hands and deck
  deck = [];
  communityCards = [];
  computer = [];
  JP = [];
  // get a full deck of cards
  for (let suits = 0; suits < 4; suits++) {
    for (let number = 1; number < 14; number++) {
      append(deck, suit[suits] + str(number));
    }
  }
  // shuffle
  deck = shuffle(deck);
  // deal wholecards
  append(computer, dealCard());
  append(computer, dealCard());
  append(JP, dealCard());
  append(JP, dealCard());
  // deal communityCards
  append(communityCards, dealCard());
  append(communityCards, dealCard());
  append(communityCards, dealCard());
  append(communityCards, dealCard());
  append(communityCards, dealCard());
}
function max(a,b){
  if (a > b){
    return a;
  }
  else if (b > a){
    return b;
  }
  else{
    return -1;
  }
}
function min(a,b){
  if (a > b){
    return b;
  }
  else if (b > a){
    return a;
  }
  else{
    return -1;
  }
}