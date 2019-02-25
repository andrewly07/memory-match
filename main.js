$(document).ready(initializeApp);
//function initializeApp(){
    //$(this).on(click (card_clicked));


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
var game_played = 0;

function initializeApp(){
    addEventHandlers()
}

function addEventHandlers(){
    $('.card').click(card_clicked);

}
function card_clicked() {
    if(!clickable){
        return;
    }

    $(this).addClass('revealed');
    $(this).find('.back').toggle();

 if(first_card_clicked === null) {
     first_card_clicked = this;

     firstCardImage = $(first_card_clicked).find('img').attr('src');
     return;
 }
    second_card_clicked = this;
    secondCardImage = $(second_card_clicked).find('img').attr('src');

        if(firstCardImage === secondCardImage){
            $(first_card_clicked).off();
            $(second_card_clicked).off();
            console.log('match');
            match_counter++;
            attempts++;
            first_card_clicked = null;
            second_card_clicked = null;

        }
        if(match_counter === total_possible_matches) {
            alert('You have won!');

        } else {
            debugger;
            attempts++;
            clickable = false;
            setTimeout(hideBothCards, 500);
            return;
        }
}


function hideBothCards() {
    //$(first_card_clicked).removeClass('revealed');
    //$(second_card_clicked).removeClass('revealed');
    $(first_card_clicked).find('.back').toggle();
    $(second_card_clicked).find('.back').toggle();
    first_card_clicked = null;
    second_card_clicked = null;
    clickable = true;
    return;

}



function display_stats(){
    $(".games_played.value").onclick(card_clicked());
    $(".attempts.value").onclick(card_clicked());


}

function reset_stats(){
    accuracy = 0;
    matches = 0;
    attempts = 0;
    display_stats();
}

function resetButton(){
    game_played++;
    reset_stats();
    display_stats();
    $(".card_clicked").find('.card').reset();


}

