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
  'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2238b752-2da3-42e8-b1f2-6d1c0e900499/d9x6ehq-b3c065de-6a13-4999-b3c0-45a862020594.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzIyMzhiNzUyLTJkYTMtNDJlOC1iMWYyLTZkMWMwZTkwMDQ5OVwvZDl4NmVocS1iM2MwNjVkZS02YTEzLTQ5OTktYjNjMC00NWE4NjIwMjA1OTQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.i9JSt1dlQ7vqUySU8o8hfS_4tggtNYnSWICSrDiC-10',
  'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2238b752-2da3-42e8-b1f2-6d1c0e900499/da5kpl2-e6e28aa5-fa74-4e19-8e76-a72d0ddf619c.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzIyMzhiNzUyLTJkYTMtNDJlOC1iMWYyLTZkMWMwZTkwMDQ5OVwvZGE1a3BsMi1lNmUyOGFhNS1mYTc0LTRlMTktOGU3Ni1hNzJkMGRkZjYxOWMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.XSCBTRdMV3Y9WNEmvJvejFo8LrssOPQPHNlQRa1nQKI',
  'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2238b752-2da3-42e8-b1f2-6d1c0e900499/d9wxb8v-743f5b0a-3de2-460e-bcee-38cc4aa8c541.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzIyMzhiNzUyLTJkYTMtNDJlOC1iMWYyLTZkMWMwZTkwMDQ5OVwvZDl3eGI4di03NDNmNWIwYS0zZGUyLTQ2MGUtYmNlZS0zOGNjNGFhOGM1NDEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.OAnNZlbyQ22zYqYoWz6OGCUQUPzXeyLFereFUq-j_Do',
  'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2238b752-2da3-42e8-b1f2-6d1c0e900499/dayblju-74d04ba7-68d7-405e-ac75-f4ad85ad0e9c.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzIyMzhiNzUyLTJkYTMtNDJlOC1iMWYyLTZkMWMwZTkwMDQ5OVwvZGF5YmxqdS03NGQwNGJhNy02OGQ3LTQwNWUtYWM3NS1mNGFkODVhZDBlOWMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.knzhf5-rINmOR_Cfu1nrUG2JWWCAYR1NXneWakGWKnc',
  'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2238b752-2da3-42e8-b1f2-6d1c0e900499/da72v4m-d0fcac82-60de-4a4f-8bde-114d8cadd70b.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzIyMzhiNzUyLTJkYTMtNDJlOC1iMWYyLTZkMWMwZTkwMDQ5OVwvZGE3MnY0bS1kMGZjYWM4Mi02MGRlLTRhNGYtOGJkZS0xMTRkOGNhZGQ3MGIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.lXja0uRm-9bGDhdqfvHN30w3Ap5Jn66LCtpYUgEmJT0',
  'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2238b752-2da3-42e8-b1f2-6d1c0e900499/db86x7z-28f4be6a-2c1f-4877-93e0-75d6e7eac59d.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzIyMzhiNzUyLTJkYTMtNDJlOC1iMWYyLTZkMWMwZTkwMDQ5OVwvZGI4Nng3ei0yOGY0YmU2YS0yYzFmLTQ4NzctOTNlMC03NWQ2ZTdlYWM1OWQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.652Xvpm3xWf7EgHMIFexGg1kO2mTJioADpRWk6uasno',
  'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2238b752-2da3-42e8-b1f2-6d1c0e900499/db2k64x-0f0a5577-10cb-4520-a2bc-41ea990e0d49.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzIyMzhiNzUyLTJkYTMtNDJlOC1iMWYyLTZkMWMwZTkwMDQ5OVwvZGIyazY0eC0wZjBhNTU3Ny0xMGNiLTQ1MjAtYTJiYy00MWVhOTkwZTBkNDkucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.FbInZzmQ_z5rqn2DoDc72vKJVRI6lxoIdwb4uzjcEpE',
  'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2238b752-2da3-42e8-b1f2-6d1c0e900499/d9v3znp-4e9db436-73fc-4e1d-a0e8-2aa5f1af572a.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzIyMzhiNzUyLTJkYTMtNDJlOC1iMWYyLTZkMWMwZTkwMDQ5OVwvZDl2M3pucC00ZTlkYjQzNi03M2ZjLTRlMWQtYTBlOC0yYWE1ZjFhZjU3MmEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.3fBo8qvDBj76bqK86_vNXvJNZ7lQ4DRFAn29KavORws',
  'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2238b752-2da3-42e8-b1f2-6d1c0e900499/daykj52-7dd5cbb5-fec4-428d-92b0-47d5a301493a.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzIyMzhiNzUyLTJkYTMtNDJlOC1iMWYyLTZkMWMwZTkwMDQ5OVwvZGF5a2o1Mi03ZGQ1Y2JiNS1mZWM0LTQyOGQtOTJiMC00N2Q1YTMwMTQ5M2EucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.iyI4Ue6lbS1uSnjrrtiZFGoW16H9O4v7DgMHnLzN6Dg'
  
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
    // $('#playButton').click(this.handlePlayButton);
    this.handlePlayButton();
    $("#playButton").click(this.playSound);
  }

  playSound() {
    var player = new Audio('images/yugiohthemesong.mp3');
    player.volume = .4;
    player.play();
  }
 

  handlePlayButton(){
    $('.introPage').toggleClass('hide');
    $('.mainContainer').removeClass('hide');
  
  }
  createCards(){
    for(var i =0; i< this.newArray.length; i++){
      var card = new MMCard('https://vignette.wikia.nocookie.net/yugioh/images/d/d7/Back-Anime-DM.png/revision/latest?cb=20071029201207', this.newArray[i], this.handleChildClick);
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

//  function clickOffScreenModal(){
//    $('#loserModal').modal('hide');
//  }
