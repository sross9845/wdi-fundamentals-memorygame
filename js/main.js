    
var cards = [
    {
      rank: "queen", 
      suit: "hearts",
      cardImage: "images/queen-of-hearts.png",
      node: undefined
    },
    {
      rank: "queen", 
      suit: "diamonds",
      cardImage: "images/queen-of-diamonds.png",
      node: undefined
    },
    {
      rank: "king", 
      suit: "hearts",
      cardImage: "images/king-of-hearts.png",
      node: undefined
    },
    {
      rank: "king", 
      suit: "diamonds",
      cardImage: "images/king-of-diamonds.png",
      node: undefined
    }
  ];
  
  var cardsInPlay = [];
  var matchedCards = [];
  
  function randomiseCardOrder(cardArray) {
    for (var i = cardArray.length - 1; i > 0; i--) {
        var randomIndex = Math.floor(Math.random() * (i + 1));
        var toBeSwapped = cardArray[i];
        cardArray[i] = cardArray[randomIndex];
        cardArray[randomIndex] = toBeSwapped;
    };
  }
  
  function turnCardsFaceDown() {
    Array.from(document.querySelector("#game-board").children).forEach(element => element.setAttribute("src", "images/back.png"));
  }
  
  function resetBoard() {
    turnCardsFaceDown();
    randomiseCardOrder(cards);
    cardsInPlay = [];
    matchedCards = [];
  }
  
  function checkForMatch() {
    if (cardsInPlay[0].rank === cardsInPlay[1].rank) {
      if (cardsInPlay.length + matchedCards.length === 4) {
        alert("You win!");
        resetBoard();
      } else {
        alert("You found a match!");
        matchedCards = cardsInPlay;
        cardsInPlay = [];
      }
    } else {
      alert("Sorry, try again.");
      turnCardsFaceDown();
      cardsInPlay = [];
    }
  }
  
  function flipCard() {
    var cardId = this.getAttribute("data-id");
    console.log("User flipped " +  cards[cardId].rank);
    console.log(cards[cardId].cardImage);
    console.log(cards[cardId].suit);
    if (cards[cardId] !== cardsInPlay[0]) {
      cardsInPlay.push(cards[cardId]);
      this.setAttribute("src", cards[cardId].cardImage);
      if (cardsInPlay.length === 2) {
        setTimeout(checkForMatch, 250);
      }
    }
  }
  
  function createBoard() {
    randomiseCardOrder(cards);
    for (var i = 0; i < cards.length; i++) {
      var cardElement = document.createElement("img");
      cardElement.setAttribute("src", "images/back.png");
      cardElement.setAttribute("data-id", i);
      cardElement.addEventListener('click', flipCard);
      document.querySelector("#game-board").appendChild(cardElement);
      cards[i].node = cardElement;
    }
  }
  
  createBoard();