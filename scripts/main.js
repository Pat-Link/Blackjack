const dealerHand = document.getElementById("dealer-hand");
const playerHand = document.getElementById("player-hand");

let dealerSum = 0;
let playerSum = 0;

let dealerCount = 0;

let dealerAceCount = 0;
let playerAceCount = 0;

let hidden;
let deck;

let canHit = true;
let canDeal= true;


window.onload = function () {
  buildDeck();
  shuffleDeck();
  startGame()

}

function buildDeck() {
  let values = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"];
  let types = ["clubs", "diamonds", "hearts", "spades"];
  deck = [];

  for (let i = 0; i < types.length; i++) {
    for (let j = 0; j < values.length; j++) {
      deck.push(values[j] + "_of_" + types[i]);
    }
  }
  //console.log(deck)
}

function shuffleDeck() {
  for (let i = 0; i < deck.length; i++) {
    let j = Math.floor(Math.random() * deck.length);
    let temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
  //console.log(deck);
}

function startGame() {
  hidden = deck.pop();
  dealerSum += getValue(hidden);
  dealerAceCount += checkAce(hidden);
  //console.log(hidden);
  //console.log(dealerSum);
  while (dealerCount < 1) {
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./images/" + card + ".png";
    dealerSum += getValue(card);
    dealerAceCount += checkAce(card);
    document.getElementById("dealer-hand").append(cardImg);
    dealerCount++
  }
  //console.log(dealerSum);

  for (let i = 0; i < 2; i++) {
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./images/" + card + ".png";
    playerSum += getValue(card);
    playerAceCount += checkAce(card);
    document.getElementById("player-hand").append(cardImg);
  }

  //console.log(playerSum);
  document.getElementById("hit-button").addEventListener("click", hit);
  document.getElementById("stand-button").addEventListener("click", stand)

  function hit() {
    if (!canHit) {
      return;
    }
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./images/" + card + ".png"
    playerSum += getValue(card);
    playerAceCount += checkAce(card);
    document.getElementById("player-hand").append(cardImg);

    if (reduceAce(playerSum, playerAceCount) > 21) {
      canHit = false;
    }
  }

  function stand() {
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    playerSum = reduceAce(playerSum, playerAceCount);
    canHit = false;
    document.getElementById("hidden").src = "./images/" + hidden + ".png";

    while (dealerSum < 17) {
      let cardImg = document.createElement("img");
      let card = deck.pop();
      cardImg.src = "./images/" + card + ".png";
      dealerSum += getValue(card);
      dealerAceCount += checkAce(card);
      document.getElementById("dealer-hand").append(cardImg);
    }

    let message = "";
    if (playerSum > 21) {
      message = "Sorry! Try Again!!"
    }
    else if (dealerSum > 21) {
      message = "Winner, Winner Chicken Dinner!!";
    }
    else if (playerSum == dealerSum) {
      message = "Tied Up!";
    }
    else if (playerSum > dealerSum) {
      message = "Winner, Winner Chicken Dinner!!"
    }
    else if (playerSum < dealerSum) {
      message = "Sorry! Try Again!!"
    }
    document.getElementById("dealer-points").innerText = dealerSum;
    document.getElementById("score").innerText = message;
    document.getElementById("player-points").innerText = playerSum
  
  }
    //document.getElementById("score").innerText =
    //document.getElementById("player-points").innerText = playerSum
    
   
  

  function getValue(card) {
    let data = card.split("_of_");
    let value = data[0];

    if (isNaN(value)) {
      if (value == "ace") {
        return 11;
      }
      return 10;
    }
    return parseInt(value);
  }

  function checkAce(card) {
    if (card[0] == "ace") {
      return 1;
    }
    return 0;
  }

  function reduceAce(playerSum, playerAceCount) {
    while (playerSum > 21 && playerAceCount > 0) {
      playerSum -= 10;
      playerAceCount -= 1;
    }
    return playerSum;
  }
}

window.addEventListener("DOMContentLoaded", () => {
  // Execute after page load
});