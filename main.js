var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;
var firstCardImage = null;
var secondCardImage = null;
var clickable = true;
var matches = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;
var pointCounter = 8000;


var cardImages = [
  'images/blueeyes.png',
  'images/redeyes.png',
  'images/dm.png',
  'images/dmgirl.png',
  'images/slifer.png',
  'images/obelisk.png',
  'images/ra.png',
  'images/timewizard.png',
  'images/flameswordsman.png'
  
];
$(document).ready( initializeApp);

var game = null;

function initializeApp(){
  game = new MemoryMatchGame(cardImages);
  game.shuffle();
  game.createCards();


  showLifePoints();
  // reset_stats();
  display_stats();
  // resetButton();
}

class MemoryMatchGame{
  constructor( images ){
    this.images = images.concat(images);
    this.cards = [];
    this.handleChildClick = this.handleChildClick.bind(this);
    this.hideBothCards = this.hideBothCards.bind(this);
    this.clickedCards = [];
    this.newArray = [];
    this.stats = {
      matches: 0,
      attempts: 0,
      accuracy: 0,
      games_played: 0
    };
    this.addEventHandlers();
    this.resetGame = this.resetGame.bind(this);
  }

  addEventHandlers(){
    $('#playButton').click(this.handlePlayButton);
    this.handlePlayButton();
    $("#playButton").click(this.playSound);
  }

  playSound() {
    var player = new Audio('sounds/yugiohthemesong.mp3');
    player.volume = .5;
    player.play();
  }
  lifepointSound(){
    var lifeSound = new Audio('sounds/lifepointcounter.mp3');
    lifeSound.volume = 1;
    lifeSound.play();
  }

  handlePlayButton(){
    $('.introPage').toggleClass('hide');
    $('.mainContainer').removeClass('hide');
  
  }
  createCards(){
    for(var i =0; i< this.newArray.length; i++){
      var card = new MMCard('images/backCard.png', this.newArray[i], this.handleChildClick);
      this.cards.push(card);
      var cardDomElement = card.render();
      var column = $('<div>').addClass('column');
      column.append(cardDomElement);
      $(".cardContainer").append(column);
    }
  }
  shuffle(){
    while(this.images.length){
      var randomIndex = Math.floor(Math.random() * this.images.length)
      this.newArray.push(this.images[randomIndex]);
      this.images.splice(randomIndex, 1)
    }
    return this.newArray;
  }
  handleChildClick( childObject ){
    console.log(childObject , " was clicked");
    console.log('parent receiving child click');
    if(this.clickedCards.length < 2){
      this.clickedCards.push( childObject )
      childObject.reveal();
    }
    if(this.clickedCards.length === 2){
      this.checkForMatch();
    }
    if(this.stats.matches === total_possible_matches){
      console.log('You have won!');
      showWinModal();
    } 
  }
  checkForMatch(){
    if(this.clickedCards[0].getValue() === this.clickedCards[1].getValue()){
      console.log('match!');
      this.clickedCards = [];
      this.stats.matches++;
      this.stats.attempts++;
    } else {
      this.hideCardsInTime( 500 );
      this.stats.attempts++;
      pointCounter -= 1000;
      $(".lifepoints").text(pointCounter);
      this.lifepointSound();

      
    }
    if(pointCounter === 0){
      console.log('you have been mind crushed');
      showLoseModal();
    }
  }
  hideCardsInTime( timeToWait ){
    setTimeout( this.hideBothCards, timeToWait );
  }
  hideBothCards(){
    this.clickedCards[0].hide();
    this.clickedCards[1].hide();
    this.clickedCards = [];
  }
  resetGame(){
    pointCounter = 8000;
    $('.front').show();
    $('.lifepoints').text(pointCounter);
    this.stats.games_played++;
    this.stats.matches = 0;
    this.stats.attempts = 0;
    this.stats.accuracy = 0;
    this.stats.display_stats();
  }
  display_stats(){
 
    $('.attempts .value').text(this.stats.attempts);
    $('.accuracy .value').text(this.stats.accuracy);
    $('.gamesplayed .value').text(this.stats.games_played);
    $('.matches .value').text(this.stats.matches);
  
  }

  
}

class MMCard{
  constructor(foreImage, backImage, clickCallback){
    this.foreImage = foreImage;
    this.backImage = backImage;
    this.callback = clickCallback;
    this.domElements = {
      container: null,
      front: null,
      back: null
    };
    this.isRevealed = false;
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(){
    console.log('child called');
    if(this.isRevealed === true){
      return;
    }
    this.callback( this );
  }
  getValue(){
    return this.backImage;
  }
  reveal(){
    this.isRevealed = true;
    // this.domElements.front.hide();

    this.domElements.container.addClass('flipped');
  }
  hide(){
    this.isRevealed = false;
    // this.domElements.front.show();
    this.domElements.container.removeClass('flipped');
  }
  render(){
    this.domElements.container = $("<div>",{
      'class': 'card'
    });
    this.domElements.container.click( this.handleClick );
    this.domElements.front = $('<div>',{
      'class': 'front',
      css: {
        'background-image': `url(${this.foreImage})`
      }
    });
    this.domElements.back = $("<div>",{
      'class': 'back',
      css: {
        'background-image': `url(${this.backImage})`
      }      
    })
    this.domElements.container.append(this.domElements.back,this.domElements.front );
    return this.domElements.container;
  }
}

function showLifePoints(){
  $(".lifepoints").text(pointCounter);
}


function display_stats(){
 
  $('.attempts .value').text(this.stats.attempts);
  $('.accuracy .value').text(this.stats.accuracy);
  $('.gamesplayed .value').text(this.stats.games_played);
  $('.matches .value').text(this.stats.matches);

}

function showWinModal(){
  $('.winner').removeClass('hide').show('winnerModal');
  $('.winner').modal('hide');
  
 }
 function showLoseModal(){
  $('.loser').removeClass('hide').show('loserModal');
   $('.loser').modal('hide');
 }


