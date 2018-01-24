//console.log("Script.js running\n--");

// Score Counter
var score = 0;

// Score Converter (Used to convert other variables to score points)
var scoreConverter = 0;

// Visibility Toggle
var visibility = 0;

// Detects EndGame
var isGameOver = 0;

// Stops multiple postings of score
var isScoreFinal = 0;

// Axis Speed
var ax = 0;
var ay = 0;

// Speed Multiplier
var changeX = 0;
var changeY = 0;


//  P5.js AUDIO SETUP
// MAKING IT MORE ADVANCED USING THE 'TYPE' INPUT
var audio2;

function setup() {
  audio2 = loadSound('assets/death.mp3');
}

function playAudio(type) {
    if (type === "death")
    {
        audio2.play();
    }
}

//
//
//
//
// POSTS THE SCORE TO THE CONSOLE.
function postScore() {
    console.log('%c Score:  ' + Math.round(score) + ' ', 'background: #27CD30; color: white');
    isScoreFinal = 1;
    console.log('%c Game Over ', 'background: red; color: white');
    gameEnded();
    playAudio("death");
    $("#slider").slideDown("slow");
}
//
//
//
//
//

function reloadPage() {
    location.reload();
}

// The variable must be outside the function to export.
var person;


// Toggle visibility
function toggleV() {
    if (visibility === 0) {
        visibility = 1;
    }
    else {
        visibility = 0;
    }
}

// Stops movement
function stop1() {
    ax = 0;
    ay = 0;
    changeX = 0;
    changeY = 0;
}

// Changes Y axis speed
    function up() {
        changeY = 0.04;
    }

// Changes Y axis speed
    function down() {
        changeY = -0.04;
    }

// Changes X axis speed
    function left() {
        changeX = -0.04;
    }

// Changes X axis speed
    function right() {
        changeX = 0.04;
    }


//////////////////////////////////////////


// When document is loaded,
$(document).ready(function() {

    $("#slider").hide();

    var canvas          =   document.getElementById("myCanvas");
    var context         =   canvas.getContext("2d");
    var canvasWidth     =   canvas.width;
    var canvasHeight    =   canvas.height;


    // Create a ball
    ball        =   new Ball(5);

    var randomColor = ball.color;
    console.log(randomColor);

    document.getElementById("myCanvas").style.color = randomColor;


    var parseURL = document.URL.split( '=' );

    console.log('%c Username: ' + parseURL[1] + ' ', 'background: #F0FF74; color: black');

    person = parseURL[1];

    // Randomise the starting X and Y positions
    // var xPos    =   Math.floor(Math.random() * canvasWidth - 5) + 0;
    // var yPos    =   Math.floor(Math.random() * canvasHeight - 5) + 0;

	var xPos = canvasWidth / 2;
	var yPos = canvasHeight / 2;
	
    var trailX = [];
    var trailY = [];

	ax = 0;
	ay = 0;

    getHighScore();

    // Begin animation
    function animate() {

        // Begin animating frames
        window.requestAnimationFrame(animate, canvas)

        if (isGameOver === 0) {
            score = score + scoreConverter;
            //console.log(score);
        }

        document.getElementById('scoreBox').value = Math.round(score);
        document.getElementById('highScoreBox').value = downloadScore;

        // LEFT CONTROLS (37)
        document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === 37) {
            //ax = 0;
            //ay = 0;
            changeX = -0.05 * Math.cos(1);
            changeY = 0;
            scoreConverter = 0.05;
        }
        });

        // RIGHT CONTROLS (39)
        document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === 39) {
            //ax = 0;
            //ay = 0;
            changeX = -0.05 * Math.cos(2);
            changeY = 0;
            scoreConverter = 0.05;
        }
        });

        // UP CONTROLS (38)
        document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === 38) {
            //ax = 0;
            //ay = 0;
            changeX = 0;
            changeY = -0.05 * Math.cos(2);
            scoreConverter = 0.05;
        }
        });

        // DOWN CONTROLS (40)
        document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === 40) {
            //ax = 0;
            //ay = 0;
            changeX = 0;
            changeY = 0.05 * Math.cos(2);
            scoreConverter = 0.05;
        }
        });


        ax = ax + changeY;
        ay = ay + changeX;

        xPos = xPos + ay;
        yPos = yPos + ax;


        if (score > downloadScore) {
            document.getElementById("scoreBox").style.background = "#6af26c";
            document.getElementById("highScoreBox").value = Math.round(score);
        }
		
		
		
		
		if (xPos > canvasWidth) {
			changeX = 0;
            changeY = 0;
            isGameOver = 1;

            if (isScoreFinal === 0) {
                postScore();
            }
		}
		
		if (xPos < 0) {
            changeX = 0;
            changeY = 0;
            isGameOver = 1;

            if (isScoreFinal === 0) {
                postScore();
            }
		}
		
		if (yPos > canvasHeight) {
            changeX = 0;
            changeY = 0;
            isGameOver = 1;

            if (isScoreFinal === 0) {
                postScore();
            }

		}
		
		if (yPos < 0) {
            changeX = 0;
            changeY = 0;
            isGameOver = 1;

            if (isScoreFinal === 0) {
                postScore();
            }
		}

		
		
        ball.x = xPos;
        ball.y = canvasHeight - yPos;

        ball.draw(context);

        // The trails keeps track of the snake's previous path
        trailX.push(xPos);
        trailY.push(yPos);


    };

    window.requestAnimationFrame(animate, canvas);

});