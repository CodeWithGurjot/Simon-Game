let gamePattern = [];

let buttonColours = ["red", "blue", "green", "yellow"];

let userClickedPattern = [];

let level = 0;

$(document).keydown(function (e) { 
    if (gamePattern.length===0){
        nextSequence();
    }

});

//Random number
function nextSequence(){
    // userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+ randomChosenColour).fadeOut(70).fadeIn(70).fadeOut(70).fadeIn(70); //Animation

    playSound(randomChosenColour);  //calling the sound function

    console.log(gamePattern);

}


$(".btn").click(function() {
    let userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);

    animatePress(userChosenColour);
  
    playSound(userChosenColour);  //calling the sound function

    checkAnswer(userClickedPattern.length-1);

    console.log(userClickedPattern);

})

function playSound(name){
    let audioSource = "sounds/" + name + ".mp3";
    let audio = new Audio( audioSource );
    audio.play();
}

function animatePress(currentColour){
    $("."+ currentColour).addClass("pressed");

    setTimeout(() => {
        $("." + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentlevel) {
    if (userClickedPattern[currentlevel]===gamePattern[currentlevel]) {
        console.log("Success");
        if(userClickedPattern.length===gamePattern.length){
          setTimeout(() => {
            nextSequence();
            userClickedPattern.length=0;
          }, 1000);
        }
    } else {
        let wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();

        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").html("Game Over, Press Any Key to Restart")

        startOver();

    }
}


function startOver(){
    level = 0;
    gamePattern.length = 0;
    userClickedPattern.length = 0;
}