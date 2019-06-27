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
  game.showLifePoints();
  game.display_stats();

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
    this.resetGame = this.resetGame.bind(this);
    this.display_stats = this.display_stats.bind(this);
    this.showLifePoints = this.showLifePoints.bind(this);
    this.showWinModal = this.showWinModal.bind(this);
    this.showLoseModal = this.showLoseModal.bind(this);
    this.addEventHandlers();

  }

  addEventHandlers(){
    $('#playButton').click(this.handlePlayButton);
    this.handlePlayButton();
    $("#playButton").click(this.playSound);
    $("#resetButton").click(this.resetGame);
    
  }
  showLifePoints(){
      $(".lifepoints").text(pointCounter);
  }
  playSound() {
    var player = new Audio('sounds/yugiohthemesong.mp3');
    player.volume = .3;
    player.play();
  }
  lifepointSound(){
    var lifeSound = new Audio('sounds/lifepointcounter.mp3');
    lifeSound.volume = 1;
    lifeSound.play();
  }
  lifepointAnimate(){
    $('.lifepoints').fadeOut("slow").text(this.pointCounter); 
    $('.lifepoints').fadeIn("slow").text(this.pointCounter); 
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
      this.showWinModal();
    } 
  }
  checkForMatch(){
    if(this.clickedCards[0].getValue() === this.clickedCards[1].getValue()){
      console.log('match!');
      this.clickedCards = [];
      this.stats.matches++;
      this.stats.attempts++;
      this.display_stats();
    } else {
      this.hideCardsInTime( 500 );
      this.stats.attempts++;
      pointCounter -= 1000;
      $(".lifepoints").text(pointCounter);
      this.lifepointSound();
      this.lifepointAnimate();
      this.display_stats();


      
    }
    if(pointCounter === 0){
      console.log('you have been mind crushed');
      this.showLoseModal();
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
    console.log('sup', this.stats.games_played)
    this.stats.matches = 0;
    this.stats.attempts = 0;
    this.stats.accuracy = 0;
    this.display_stats();
  }
  display_stats(){
    if(this.stats.attempts === 0){
      this.stats.accuracy === 0
    }else{
      this.stats.accuracy = Math.floor(this.stats.matches / this.stats.attempts * 100)
    };
  $('.attemptValue').text(this.stats.attempts);
  $('.accuracyValue').text(this.stats.accuracy +'%');
  $('.gamesValue').text(this.stats.games_played);
  $('.matchValue').text(this.stats.matches);
  
  }
  showWinModal(){
    $('.winner').removeClass('hide').show('winnerModal');
    $('.winner').modal('hide');
  }
  showLoseModal(){
    $('.loser').removeClass('hide').show('loserModal');
    $('.loser').modal('hide');
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

// function showLifePoints(){
//   $(".lifepoints").text(pointCounter);
// }


// function display_stats(){
 
//   $('.attempts .attemptValue').text(this.stats.attempts);
//   $('.accuracyValue').text(this.stats.accuracy);
//   $('.gamesValue').text(this.stats.games_played);
//   $('.matchesValue').text(this.stats.matches);

// }

// function showWinModal(){
//   $('.winner').removeClass('hide').show('winnerModal');
//   $('.winner').modal('hide');
  
//  }
//  function showLoseModal(){
//   $('.loser').removeClass('hide').show('loserModal');
//    $('.loser').modal('hide');
//  }


//number of matches divide attempts times 100 and then Math.floor it.;
